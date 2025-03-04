import ResetPasswordModal from './ResetPasswordModal';
import Field from '../../../common/components/final-form/FinalFormInputField';
import useModalOpen from '../../../common/hooks/useModalOpen';
import useUserAuthentication from '../hooks/useUserAuthentication';
import { LoginForm } from '../users.thunks';
import { faRightToBracket } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { Form } from 'react-final-form';
import { useSearchParams } from 'react-router-dom';

export const REDIRECT_Q = 'redirect';

export default function Login() {
    const { handleLogin, loading } = useUserAuthentication();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const [resetPassModOpen, openResetPassMod, closeResetPassMod] = useModalOpen();

    return (
        <>
            <Form<LoginForm>
                onSubmit={handleLogin}
                subscription={{ submitting: true }}
                initialValues={{
                    usernameOrEmail: email || '',
                    password: '',
                }}>
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
                                <Button
                                    variant="outlined"
                                    type="submit"
                                    startIcon={
                                        loading
                                            ? <CircularProgress size={20} className="toolbar-purple" />
                                            : <FontAwesomeIcon icon={faRightToBracket} />
                                    }>
                                    Log In
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    color="warning"
                                    variant="outlined"
                                    onClick={openResetPassMod}
                                    type="button">
                                    Forgot password?
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Form>
            <ResetPasswordModal open={resetPassModOpen} onClose={closeResetPassMod} />
        </>
    );
}
