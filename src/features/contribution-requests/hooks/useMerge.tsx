import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { setAlert } from '../../app/appSlice';
import { showNode } from '../../nodes/nodes.thunks';
import { CRPrimaryKey } from '../contributionRequest.types';
import { mergeContributionRequest } from '../contributionRequests.thunks';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function useMerge() {
    const {
        id: nodeId,
        contributionRequestId: id,
    } = useParams();

    if (!nodeId) {
        throw new Error('Missing nodeId');
    }

    if (!id) {
        throw new Error('Missing contributionRequestId');
    }

    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();
    const navigate = useNavigate();

    return useCallback(async () => {
        const response = await dispatch(mergeContributionRequest({
            nodeId,
            id,
        } as CRPrimaryKey));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

            handleServerError(error);
            console.error(error);

            return;
        }

        await dispatch(showNode(nodeId));
        navigate(`/nodes/${nodeId}`);
        setTimeout(() => dispatch(setAlert({
            isOpen: true,
            severity: 'success',
            message: 'Contribution request merged successfully!',
        })));
    }, [dispatch, handleServerError, id, navigate, nodeId]);
}
