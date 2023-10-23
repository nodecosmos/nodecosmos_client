import React from 'react';
import { Form } from 'react-final-form';
/* mui */
import { Button, Grid } from '@mui/material';
import Field from '../../../common/components/final-form/FinalFormInputField';
import useUserAuthentication from '../hooks/useUserAuthentication';
/* nodecosmos */

export default function LoginForm() {
    const { handleLogin } = useUserAuthentication();

    return (
        <Form onSubmit={handleLogin} subscription={{ submitting: true }}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={12}>
                            <Field
                                fullWidth
                                name="username_or_email"
                                label="username || email"
                                InputProps={{
                                    autoComplete: 'on',
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                fullWidth
                                label="password"
                                name="password"
                                type="password"
                                InputProps={{
                                    autoComplete: 'on',
                                }}
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
