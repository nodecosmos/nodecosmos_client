import Alert from '../../common/components/Alert';
import Field from '../../common/components/final-form/FinalFormInputField';
import useBooleanStateValue from '../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../common/hooks/useHandleServerErrorAlert';
import { setAlert } from '../../features/app/appSlice';
import { updatePassword } from '../../features/users/users.thunks';
import { NodecosmosDispatch } from '../../store';
import { NodecosmosError } from '../../types';
import { passwordsMustMatch } from '../../utils/validation';
import { faSave } from '@fortawesome/pro-thin-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Button, Container, Grid, Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const [loading, setLoading, unsetLoading] = useBooleanStateValue(false);
    const handleServerError = useHandleServerErrorAlert();
    const [searchParam] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParam.get('token');

    useEffect(() => {
        if (!token) {
            navigate('/404');
        }
    }, [navigate, token]);

    const handleResetPassword = useCallback(async (formValues: { password: string }) => {
        setLoading();

        if (!token) {
            throw new Error('Token not found.');
        }

        const response = await dispatch(updatePassword({
            password: formValues.password,
            token,
        }));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            console.error(error);
            unsetLoading();
            return;
        } else if (response.meta.requestStatus === 'fulfilled') {
            const data = response.payload as { email: string };
            navigate(`/auth/login?email=${data.email}`);
            unsetLoading();
            setTimeout(() => {
                dispatch(setAlert({
                    isOpen: true,
                    message: 'Password changed. Please login to continue.',
                    severity: 'success',
                }));
            }, 250);
        }

        unsetLoading();
    }, [dispatch, handleServerError, navigate, setLoading, token, unsetLoading]);

    return (
        <Container
            maxWidth="sm"
            sx={{
                height: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{
                height: 600,
                width: 1,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography
                        sx={{
                            fontSize: 50,
                            ml: 1,
                        }}
                        fontWeight="bold">
                        <Box component="span" color="logo.blue">node</Box>
                        <Box component="span" color="logo.red">cosmos</Box>
                    </Typography>
                </Box>
                <Typography variant="body1" color="warning.main" fontWeight="bold" my={2}>
                    Reset Password
                </Typography>
                <Box mb={-4}>
                    <Alert position="static" />
                </Box>
                <Box textAlign="center" mt={3}>
                    <Form onSubmit={handleResetPassword} subscription={{ active: true }}>
                        {({
                            handleSubmit,
                            submitting,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name="password"
                                            label="New Password"
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
                                            sx={{ mt: 2 }}
                                            variant="outlined"
                                            type="submit"
                                            startIcon={
                                                loading
                                                    ? <CircularProgress
                                                        size={20}
                                                        sx={{ color: 'merge.main' }} />
                                                    : <FontAwesomeIcon icon={faSave} />
                                            }
                                            disabled={submitting}>
                                            Change Password
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Form>
                </Box>
            </Box>
        </Container>
    );
}
