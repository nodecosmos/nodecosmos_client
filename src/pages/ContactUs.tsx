import Field from '../common/components/final-form/FinalFormInputField';
import useBooleanStateValue from '../common/hooks/useBooleanStateValue';
import { setAlert } from '../features/app/appSlice';
import { AUTOCOMPLETE_OFF } from '../features/app/constants';
import { selectCurrentUser } from '../features/users/users.selectors';
import { NodecosmosDispatch } from '../store';
import { validateEmailFormat } from '../utils/validation';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button, Container, Grid,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SX = {
    height: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export default function ContactUs() {
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const [loading, setLoading, unsetLoading] = useBooleanStateValue(false);
    const dispatch: NodecosmosDispatch = useDispatch();

    const handleContactUs = useCallback(async () => {
        navigate('/');
        setLoading();

        unsetLoading();
        setTimeout(() => dispatch(setAlert({
            isOpen: true,
            severity: 'warning',
            message: 'Thread deleted!',
        })));
    }, [dispatch, navigate, setLoading, unsetLoading]);

    return (
        <Container maxWidth="sm" sx={SX}>
            <Form
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
                                <Field fullWidth name="firstName" label="First Name" required />
                            </Grid>
                            <Grid item xs={6}>
                                <Field fullWidth name="lastName" label="Last Name" required />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    fullWidth
                                    name="email"
                                    label="E-mail"
                                    validate={validateEmailFormat}
                                    required
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
                                    name="phone"
                                    label="Phone"
                                    InputProps={AUTOCOMPLETE_OFF}
                                />
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
                                            : <FontAwesomeIcon size="2xs" icon={faUser} />
                                    }
                                >
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Form>
        </Container>
    );
}
