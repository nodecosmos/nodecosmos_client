import Alert from '../../../common/components/Alert';
import Field from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { setAlert } from '../../app/appSlice';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { createInvitation } from '../invitations.thunks';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Alert as MuiAlert,
    Button, DialogActions, DialogContent, Typography,
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

const PROPS = {
    elevation: 5,
    sx: { borderRadius: 2.5 },
};

export default function InviteUserModal({ open, onClose }: Props) {
    const { branchId, nodeId } = useBranchContext();
    const [loading] = useBooleanStateValue(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();
    const onSubmit = useCallback(async ({ usernameOrEmail }: { usernameOrEmail: string }) => {
        const response = await dispatch(createInvitation({
            branchId,
            nodeId,
            usernameOrEmail,
        }));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

            if (error.status === 403) {
                return error.message; // maps error object to final-form submitError
            }

            handleServerError(error);
            console.error(error);

            return;
        }

        onClose();

        dispatch(setAlert({
            isOpen: true,
            message: 'Invitation sent successfully.',
            severity: 'success',
        }));
    }, [branchId, dispatch, handleServerError, nodeId, onClose]);

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            PaperProps={PROPS}>
            <DialogTitle fontWeight="bold">
                Invite User to Node
                <CloseModalButton onClose={onClose} />
            </DialogTitle>
            <Form<{ usernameOrEmail: string }>
                onSubmit={onSubmit}
                subscription={{ submitting: true }}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <DialogContent sx={{ overflow: 'hidden' }}>
                            <Alert position="relative" mb={2} />

                            <MuiAlert
                                severity="info"
                                variant="outlined"
                                sx={{
                                    borderRadius: 1,
                                    width: 'calc(100% - 1px)',
                                    border: 0,
                                    mb: 2,
                                    backgroundColor: 'background.1',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="body2" color="text.info">
                                    Invite a user to this node. Once invitation is  accepted, the user will become
                                    editor of this node.
                                </Typography>
                            </MuiAlert>
                            <Field
                                fullWidth
                                name="usernameOrEmail"
                                label="username || email"
                                InputProps={{ autoComplete: 'on' }}
                                required
                            />
                        </DialogContent>
                        <DialogActions sx={{
                            px: 3,
                            pb: 3,
                        }}>
                            <Button disableElevation variant="contained" onClick={onClose} color="button">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disableElevation
                                variant="outlined"
                                color="warning"
                                startIcon={
                                    loading
                                        ? <CircularProgress size={20} style={{ color: 'warning.main' }} />
                                        : <FontAwesomeIcon icon={faUserPlus} />
                                }
                            >
                                <span className="Text">
                                    Send Invitation
                                </span>
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Form>
        </Dialog>
    );
}
