import ConfirmationModal, { ConfirmType } from '../../../common/components/ConfirmationModal';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError, UUID } from '../../../types';
import { setAlert } from '../../app/appSlice';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { maybeSelectNode } from '../../nodes/nodes.selectors';
import { selectCurrentUser } from '../../users/users.selectors';
import { deleteMember } from '../subscriptions.thunks';
import { Button } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    id: UUID;
}

export default function MemberActions(props: Props) {
    const { branchId: rootId } = useBranchContext();
    const { id } = props;
    const dispatch: NodecosmosDispatch = useDispatch();
    const [modalOpen, openModal, closeModal] = useBooleanStateValue();
    const handleServerError = useHandleServerErrorAlert();
    const root = useSelector(maybeSelectNode(rootId, rootId));
    const currentUser = useSelector(selectCurrentUser);
    const isOwner = useMemo(() => {
        return root?.ownerId === currentUser?.id;
    }, [currentUser, root]);

    const handleMemberDeletion = useCallback(async () => {
        const response = await dispatch(deleteMember({
            rootId,
            memberId: id,
        }));

        if (id === currentUser?.id) {
            handleServerError({
                status: 403,
                message: 'You cannot delete yourself from the node.',
                viewMessage: true,
            });
        }

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

            setTimeout(() => handleServerError(error), 250);
            console.error(error);

            return;
        }

        setTimeout(() => dispatch(setAlert({
            isOpen: true,
            severity: 'success',
            message: 'Member deleted successfully.',
        })), 50);

        closeModal();
    }, [closeModal, currentUser?.id, dispatch, handleServerError, id, rootId]);

    if (!isOwner) {
        return null;
    }

    return (
        <div>
            <Button variant="outlined" color="error" onClick={openModal}>
                Delete
            </Button>
            <ConfirmationModal
                text="This will remove the member from your subscription."
                info="This action will also delete member from root node and all of its descendants."
                confirmText="I understand, delete this Editor"
                confirmType={ConfirmType.Deletion}
                open={modalOpen}
                onClose={closeModal}
                onConfirm={handleMemberDeletion}
            />
        </div>

    );
}
