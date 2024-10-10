import nodecosmos from '../api/nodecosmos-server';
import Alert from '../common/components/Alert';
import Field from '../common/components/final-form/FinalFormInputField';
import useBooleanStateValue from '../common/hooks/useBooleanStateValue';
import { setAlert } from '../features/app/appSlice';
import { AUTOCOMPLETE_OFF, MD_FLEX_SX } from '../features/app/constants';
import { selectCurrentUser } from '../features/users/users.selectors';
import { NodecosmosDispatch } from '../store';
import { validateEmailFormat } from '../utils/validation';
import { faShare } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Container,
    Button, Grid, Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SX = {
    height: 1,
    display: MD_FLEX_SX,
    alignItems: 'center',
    justifyContent: 'center',
    p: 2,
    overflow: 'auto',
};

interface ContactUsForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName: string;
    message: string;
}

export default function ContactUs() {
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const [loading, setLoading, unsetLoading] = useBooleanStateValue(false);
    const dispatch: NodecosmosDispatch = useDispatch();

    const handleContactUs = useCallback(async (form: ContactUsForm) => {
        setLoading();

        try {
            await nodecosmos.post('/contacts/contact_us', form);
            unsetLoading();
            navigate('/');
            setTimeout(() => dispatch(setAlert({
                isOpen: true,
                severity: 'success',
                message: 'Thank you for contacting us! We will get back to you as soon as possible.',
            })));
        } catch (error) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'error',
                message: 'Something went wrong. Please try again later.',
            }));

            console.error(error);

            unsetLoading();
        }
    }, [dispatch, navigate, setLoading, unsetLoading]);

    return (
        <Container sx={SX} maxWidth="sm">
            <div>
                <Alert position="relative" mb={2} />
                <Typography variant="h2" color="text.secondary">Contact Us</Typography>
                <Typography variant="body2" my={3} color="text.secondary">
                    Please fill out the form below and we will get back to you as soon as possible.
                </Typography>
                <Form<ContactUsForm>
                    onSubmit={handleContactUs}
                    subscription={{ active: true }}
                    initialValues={{
                        firstName: currentUser?.firstName,
                        lastName: currentUser?.lastName,
                        email: currentUser?.email,
                    }}>
                    {({
                        handleSubmit,
                        submitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Field fullWidth name="firstName" label="First Name - optional" />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field fullWidth name="lastName" label="Last Name - optional" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        name="email"
                                        label="E-mail *"
                                        validate={validateEmailFormat}
                                        required
                                        InputProps={AUTOCOMPLETE_OFF}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        name="phone"
                                        label="Phone Number - optional"
                                        InputProps={AUTOCOMPLETE_OFF}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        name="companyName"
                                        label="Company Name"
                                        InputProps={AUTOCOMPLETE_OFF}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        name="message"
                                        label="Message"
                                        type="text"
                                        required
                                        multiline
                                    />
                                    <Typography
                                        component="a"
                                        target="_blank"
                                        variant="body2"
                                        color="text.link"
                                        href="https://nodecosmos.com/privacy.html"
                                        className="mt-2 display-inline-flex"
                                    >
                                        Privacy Policy
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        disabled={submitting}
                                        startIcon={
                                            loading
                                                ? <CircularProgress size={20} className="toolbar-purple" />
                                                : <FontAwesomeIcon size="2xs" icon={faShare} />
                                        }
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Form>

            </div>
        </Container>
    );
}
