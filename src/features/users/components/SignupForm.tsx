import Field from '../../../common/components/final-form/FinalFormInputField';
import {
    passwordsMustMatch, validateEmailFormat, validateNotEmailFormat, validateURLSafe,
} from '../../../utils/validation';
import useUserAuthentication from '../hooks/useUserAuthentication';
import { UserCreateForm } from '../users.types';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { Form } from 'react-final-form';
import { useSearchParams } from 'react-router-dom';

export default function SignupForm() {
    const { handleUserCreation, loading } = useUserAuthentication();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');

    return (
        <Form<UserCreateForm>
            onSubmit={handleUserCreation}
            subscription={{ active: true }}
            initialValues={{ email: email ?? undefined }}>
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
                                helperText="Choose your username wisely as it cannot be changed later."
                                fullWidth
                                name="username"
                                validate={[validateNotEmailFormat, validateURLSafe]}
                                label="Username"
                                required
                                maxLength={20}
                                minLength={3} />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                fullWidth
                                name="email"
                                label="E-mail"
                                validate={validateEmailFormat}
                                required
                                InputProps={{ autoComplete: 'off' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                required
                                minLength={8}
                                InputProps={{ autoComplete: 'off' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                fullWidth
                                name="password_confirmation"
                                label="Password Confirmation"
                                type="password"
                                required
                                validate={passwordsMustMatch}
                                InputProps={{ autoComplete: 'off' }}
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
                                Sign up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Form>
    );
}
