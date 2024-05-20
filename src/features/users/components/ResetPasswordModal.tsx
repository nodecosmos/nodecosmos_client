import Field from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { validateEmailFormat } from '../../../utils/validation';
import { setAlert } from '../../app/appSlice';
import { resetPasswordRequest } from '../users.thunks';
import { faEnvelope } from '@fortawesome/pro-thin-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button, DialogActions, DialogContent, Grid,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function ResetPasswordModal(props: Props) {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { open, onClose } = props;
    const [loading, setLoading, unsetLoading] = useBooleanStateValue(false);
    const handleServerError = useHandleServerErrorAlert();

    const handleResetPassword = useCallback(async (formValues: { email: string }) => {
        setLoading();
        const response = await dispatch(resetPasswordRequest(formValues.email));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            console.error(error);
            unsetLoading();
            return;
        } else if (response.meta.requestStatus === 'fulfilled') {
            dispatch(setAlert({
                isOpen: true,
                message: `<b>Password Reset Requested</b>
                <br />
                <br />
                <p>
                If an account with that email address exists, we have sent a password reset link to it. 
                Please check your inbox and spam folder. The link is valid for 24 hours. 
                If you have not received the email within a few minutes, please contact our support team.
                </p>`,
                severity: 'success',
            }));
        }

        unsetLoading();
        onClose();
    }, [dispatch, handleServerError, onClose, setLoading, unsetLoading]);

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            PaperProps={{
                elevation: 5,
                sx: { borderRadius: 2.5 },
            }}
            sx={{
                '& .MuiDialog-paper': {
                    border: 1,
                    borderColor: 'borders.4',
                },
            }}>
            <DialogTitle fontWeight="bold">
                Reset Password
                <CloseModalButton onClose={onClose} />
            </DialogTitle>
            <DialogContent>
                <Form
                    onSubmit={handleResetPassword}
                    subscription={{ submitting: true }}>
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        validate={validateEmailFormat}
                                        name="email"
                                        label="email"
                                        InputProps={{ autoComplete: 'on' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        disableElevation
                                        variant="outlined"
                                        color="primary"
                                        startIcon={
                                            loading
                                                ? <CircularProgress size={20} sx={{ color: 'success.contrastText' }} />
                                                : <FontAwesomeIcon icon={faEnvelope} />
                                        }
                                    >
                                        Send Reset Email
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Form>
            </DialogContent>
            <DialogActions>
                <Button disableElevation variant="contained" onClick={onClose} color="button">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
