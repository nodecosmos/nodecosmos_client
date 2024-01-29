import Field from '../../../common/components/final-form/FinalFormInputField.jsx';
import useUserAuthentication from '../hooks/useUserAuthentication';
import { UserCreateForm } from '../users.types';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { Form } from 'react-final-form';

// eslint-disable-next-line max-len
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordsMustMatch = (value: string, values: UserCreateForm) => {
    return values.password === value ? undefined : 'passwords must match';
};
const validateEmailFormat = (email: string) => emailRegex.test(email) ? undefined : 'email must be valid';

export default function SignupForm() {
    const { handleUserCreation } = useUserAuthentication();

    return (
        <Form onSubmit={handleUserCreation} subscription={{ active: true }}>
            {({
                handleSubmit,
                submitting,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Field fullWidth name="firstName" label="First Name" />
                        </Grid>
                        <Grid item xs={6}>
                            <Field fullWidth name="lastName" label="Last Name" />
                        </Grid>
                        <Grid item xs={12}>
                            <Field fullWidth name="username" label="Username" required maxLength={20} minLength={3} />
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
                            <Button sx={{ mt: 2 }} variant="contained" type="submit" disabled={submitting}>
                                Sign up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Form>
    );
}
