import ConfirmationModal, { ConfirmType } from '../../../common/components/ConfirmationModal';
import useModalOpen from '../../../common/hooks/useModalOpen';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { setAlert } from '../../app/appSlice';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { maybeSelectNode } from '../../nodes/nodes.selectors';
import { deleteContributionRequest } from '../contributionRequests.thunks';
import { Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    nodeId: UUID;
    id: UUID;
}

export default function ContributionRequestActions(props: Props) {
    const { nodeId, id } = props;
    const dispatch: NodecosmosDispatch = useDispatch();
    const { originalId } = useBranchContext();
    const optNode = useSelector(maybeSelectNode(originalId as UUID, nodeId as UUID));
    const rootId = optNode?.rootId;
    const [delModOpen, openDelMod, closeDelMod] = useModalOpen();

    const deleteCR = useCallback(async () => {
        if (!rootId) {
            throw new Error('Root ID is not defined');
        }
        const res = await dispatch(deleteContributionRequest({
            rootId,
            nodeId,
            id,
        }));

        if (res.meta.requestStatus === 'rejected') {
            return;
        }
        dispatch(setAlert({
            isOpen: true,
            severity: 'warning',
            message: 'Contribution request deleted!',
        }));
    }, [id, dispatch, nodeId, rootId]);

    return (
        <div>
            <Button variant="outlined" color="error" onClick={openDelMod}>
                Delete
            </Button>
            <ConfirmationModal
                text="This action will delete all contributions within this CR."
                confirmText="I understand, delete this CR"
                confirmType={ConfirmType.Deletion}
                open={delModOpen}
                onClose={closeDelMod}
                onConfirm={deleteCR}
            />
        </div>

    );
}
