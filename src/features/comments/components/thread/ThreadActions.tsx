import ConfirmationModal, { ConfirmType } from '../../../../common/components/ConfirmationModal';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../store';
import { UUID } from '../../../../types';
import { setAlert } from '../../../app/appSlice';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { deleteThread } from '../../comments.thunks';
import { Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
    id: UUID;
}

export default function ThreadActions(props: Props) {
    const {
        originalId: rootId, branchId, nodeId,
    } = useBranchContext();
    const { id } = props;
    const dispatch: NodecosmosDispatch = useDispatch();
    const [modalOpen, openModal, closeModal] = useBooleanStateValue();

    const handleThreadDeletion = useCallback(async () => {
        if (!rootId) {
            throw new Error('Root ID is not defined');
        }
        const res = await dispatch(deleteThread({
            branchId,
            objectId: nodeId,
            id,
        }));

        if (res.meta.requestStatus === 'rejected') {
            setTimeout(() => dispatch(setAlert({
                isOpen: true,
                severity: 'error',
                message: 'Failed to delete thread.',
            })), 250);
            return;
        }

        setTimeout(() => dispatch(setAlert({
            isOpen: true,
            severity: 'warning',
            message: 'Thread deleted!',
        })));
    }, [rootId, dispatch, branchId, nodeId, id]);

    return (
        <div>
            <Button variant="outlined" color="error" onClick={openModal}>
                Delete
            </Button>
            <ConfirmationModal
                text="This action will delete the thread and all of its comments."
                confirmText="I understand, delete this Thread"
                confirmType={ConfirmType.Deletion}
                open={modalOpen}
                onClose={closeModal}
                onConfirm={handleThreadDeletion}
            />
        </div>

    );
}
