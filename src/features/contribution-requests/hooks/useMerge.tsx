import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { setAlert } from '../../app/appSlice';
import { clearBranchData } from '../../nodes/nodes.actions';
import { clearWorkflowBranchData } from '../../workflows/workflowsSlice';
import { mergeContributionRequest } from '../contributionRequests.thunks';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function useMerge() {
    const {
        id: nodeId,
        branchId: id,
    } = useParams();

    if (!nodeId) {
        throw new Error('Missing nodeId');
    }

    if (!id) {
        throw new Error('Missing branchId');
    }

    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();
    const navigate = useNavigate();

    return useCallback(async () => {
        try {
            const response = await dispatch(mergeContributionRequest({
                nodeId,
                id,
            }));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;

                handleServerError(error);
                console.error(error);

                return;
            }

            dispatch(clearBranchData(nodeId));
            dispatch(clearWorkflowBranchData(nodeId));
            navigate(`/nodes/${nodeId}`);
            setTimeout(() => dispatch(setAlert({
                isOpen: true,
                severity: 'success',
                message: 'Contribution request merged successfully!',
            })), 250);
        }
        catch (error) {
            console.error(error);
        }
    }, [dispatch, handleServerError, id, navigate, nodeId]);
}
