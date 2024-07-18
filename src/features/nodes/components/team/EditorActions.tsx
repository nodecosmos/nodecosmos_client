import ConfirmationModal, { ConfirmType } from '../../../../common/components/ConfirmationModal';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../../store';
import { NodecosmosError, UUID } from '../../../../types';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { selectCurrentUser } from '../../../users/users.selectors';
import { maybeSelectNode } from '../../nodes.selectors';
import { deleteEditor } from '../../nodes.thunks';
import { Button } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    id: UUID;
}

export default function EditorActions(props: Props) {
    const { branchId, nodeId } = useBranchContext();
    const { id } = props;
    const dispatch: NodecosmosDispatch = useDispatch();
    const [modalOpen, openModal, closeModal] = useBooleanStateValue();
    const handleServerError = useHandleServerErrorAlert();
    const root = useSelector(maybeSelectNode(branchId, nodeId));
    const currentUser = useSelector(selectCurrentUser);
    const isOwner = useMemo(() => {
        return root?.ownerId === currentUser?.id;
    }, [currentUser, root]);

    const handleEditorDeletion = useCallback(async () => {
        const response = await dispatch(deleteEditor({
            branchId,
            id: nodeId,
            editorId: id,
        }));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

            setTimeout(() => handleServerError(error), 250);
            console.error(error);

            return;
        }
    }, [branchId, dispatch, handleServerError, id, nodeId]);

    if (!isOwner) {
        return null;
    }

    return (
        <div>
            <Button variant="outlined" color="error" onClick={openModal}>
                Delete
            </Button>
            <ConfirmationModal
                text="This action will delete editor from current node and its descendants."
                confirmText="I understand, delete this Editor"
                confirmType={ConfirmType.Deletion}
                open={modalOpen}
                onClose={closeModal}
                onConfirm={handleEditorDeletion}
            />
        </div>

    );
}
