import Field from '../../../common/components/final-form/FinalFormInputField';
import useUserAuthentication from '../hooks/useUserAuthentication';
import { LoginForm } from '../users.thunks';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { Form } from 'react-final-form';

export const REDIRECT_Q = 'redirect';

export default function Login() {
    const { handleLogin } = useUserAuthentication();

    return (
        <Form<LoginForm> onSubmit={handleLogin} subscription={{ submitting: true }}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Field
                                fullWidth
                                name="usernameOrEmail"
                                label="username || email"
                                InputProps={{ autoComplete: 'on' }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                fullWidth
                                label="password"
                                name="password"
                                type="password"
                                InputProps={{ autoComplete: 'on' }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button sx={{ mt: 2 }} variant="contained" type="submit">
                                Log In
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Form>
    );
}
