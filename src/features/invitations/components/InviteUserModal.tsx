/* eslint-disable react/jsx-no-bind */
import InviteUsersList from './InviteUsersList';
import Alert from '../../../common/components/Alert';
import Field from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useDebounce from '../../../common/hooks/useDebounce';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { isEmail } from '../../../utils/validation';
import { setAlert } from '../../app/appSlice';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { searchUsers } from '../../users/users.thunks';
import { ShowUser } from '../../users/users.types';
import { createInvitation } from '../invitations.thunks';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Alert as MuiAlert,
    Button,
    DialogActions,
    DialogContent,
    Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useCallback, useState } from 'react';
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
    const [loading, setLoading, unsetLoading] = useBooleanStateValue(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();
    const onSubmit = useCallback(async ({ usernameOrEmail }: { usernameOrEmail: string }) => {
        setLoading();

        const response = await dispatch(createInvitation({
            branchId,
            nodeId,
            usernameOrEmail,
        }));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

            if (error.status === 403) {
                unsetLoading();
                return error.message; // maps error object to final-form submitError
            }

            handleServerError(error);
            console.error(error);

            unsetLoading();

            return;
        }

        setUsernameFromList(null);

        onClose();
        unsetLoading();

        setTimeout(() => {
            dispatch(setAlert({
                isOpen: true,
                message: 'Invitation sent successfully.',
                severity: 'success',
            }));
        }, 250);
    }, [branchId, dispatch, handleServerError, nodeId, onClose, setLoading, unsetLoading]);

    const [users, setUsers] = useState<ShowUser[]>([]);
    const [usernameFromList, setUsernameFromList] = React.useState<null | string>(null);
    const [to, setTo] = useState<string | null>(null);

    const handleSearch = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsernameFromList(null);
        setUsers([]);

        if (isEmail(event.target.value)) {
            setTo(event.target.value);
            return;
        } else {
            setTo(null);
        }

        const response = await dispatch(searchUsers(event.target.value));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

            handleServerError(error);
            console.error(error);

            return;
        }

        setUsers(response.payload as ShowUser[]);
    }, [dispatch, handleServerError]);

    const [handleSearchCb, searchInProgress] = useDebounce(handleSearch, 500);

    const handleClose = useCallback(() => {
        setUsernameFromList(null);
        onClose();
    }, [onClose]);

    return (
        <Dialog
            onClose={handleClose}
            fullWidth
            maxWidth="lg"
            open={open}
            PaperProps={PROPS}>
            <DialogTitle fontWeight="bold">
                Invite User to Node
                <CloseModalButton onClose={handleClose} />
            </DialogTitle>
            <Form<{ usernameOrEmail: string }>
                onSubmit={onSubmit}
                subscription={{ submitting: true }}>
                {({ handleSubmit, form }) => (
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
                                    Invite a user to collaborate on this node. If the user is not a member of the
                                    nodecosmos, you can invite them by their email. Once invitation is  accepted,
                                    the user will become editor of this node.
                                </Typography>
                            </MuiAlert>
                            <Field
                                fullWidth
                                name="usernameOrEmail"
                                label="username || email"
                                onChange={handleSearchCb}
                                InputProps={{
                                    autoComplete: 'off',
                                    endAdornment: searchInProgress ? <CircularProgress
                                        size={30}
                                        sx={{
                                            color: 'text.secondary',
                                            mr: 2,
                                        }} /> : null,
                                }}
                                required
                            />

                            <InviteUsersList
                                setTo={setTo}
                                usernameFromList={usernameFromList}
                                users={users}
                                form={form}
                                setUsernameFromList={setUsernameFromList}
                            />
                        </DialogContent>
                        <DialogActions sx={{
                            px: 3,
                            pb: 3,
                        }}>
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
                                sx={{ height: 'auto' }}
                            >
                                <span className="Text">
                                    Send Invitation
                                    {
                                        to ? <span> to <b>{to}</b></span> : null
                                    }
                                </span>
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Form>
        </Dialog>
    );
}
