
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
import { STRIPE_ENABLED } from '../../app/constants';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { selectNode } from '../../nodes/nodes.selectors';
import { searchUsers } from '../../users/users.thunks';
import { ShowUser } from '../../users/users.types';
import { createInvitation } from '../invitations.thunks';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    DialogActions,
    DialogContent, Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import React, {
    useCallback, useMemo, useState,
} from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    open: boolean;
    onClose: () => void;
}

const PROPS = {
    elevation: 5,
    sx: {
        borderRadius: 2.5,
        p: 1,
    },
};

export default function InviteUserModal({ open, onClose }: Props) {
    const { branchId, nodeId } = useBranchContext();
    const [loading, setLoading, unsetLoading] = useBooleanStateValue(false);
    const node = useSelector(selectNode(branchId, nodeId));
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert(true);
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
                handleServerError(error);
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

    const inputProps = useMemo(() => ({
        autoComplete: 'off',
        endAdornment: searchInProgress ? <CircularProgress
            size={30}
            sx={{
                color: 'texts.secondary',
                mr: 2,
            }} /> : null,
    }), [searchInProgress]);

    const handleClose = useCallback(() => {
        setUsernameFromList(null);
        onClose();
    }, [onClose]);

    return (
        <Dialog
            onClose={handleClose}
            maxWidth="md"
            open={open}
            PaperProps={PROPS}>
            <div className="DialogHeader">
                <div>
                    <Typography variant="h6" color="texts.secondary" align="center" width="auto" fontWeight="bold">
                        <FontAwesomeIcon icon={faUserPlus} size="lg" />
                        Invite a user to collaborate on this node
                    </Typography>
                </div>
                <CloseModalButton onClose={onClose} />
            </div>
            <Form<{ usernameOrEmail: string }>
                onSubmit={onSubmit}
                subscription={{ submitting: true }}>
                {({
                    handleSubmit,
                    form,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <Alert position="relative" mb={2} modal />
                            <Field
                                fullWidth
                                name="usernameOrEmail"
                                label="username || email"
                                onChange={handleSearchCb}
                                InputProps={inputProps}
                                required
                            />

                            <InviteUsersList
                                setTo={setTo}
                                usernameFromList={usernameFromList}
                                users={users}
                                form={form}
                                setUsernameFromList={setUsernameFromList}
                            />
                            {
                                node && !node.isPublic && STRIPE_ENABLED && (
                                    <Typography
                                        variant="subtitle1"
                                        color="texts.tertiary"
                                        mt={1}
                                        width={1}>
                                        If user is not a member of your organization, they will be automatically
                                        added to your organization and billed accordingly.
                                    </Typography>
                                )
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button
                                type="submit"
                                disableElevation
                                variant="outlined"
                                color="warning"
                                startIcon={
                                    loading
                                        ? <CircularProgress size={20} className="toolbar-orange" />
                                        : <FontAwesomeIcon icon={faUserPlus} />
                                }
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
