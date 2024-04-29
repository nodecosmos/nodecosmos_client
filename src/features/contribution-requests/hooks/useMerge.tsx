import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError, UUID } from '../../../types';
import { setAlert } from '../../app/appSlice';
import useBranchParams from '../../branch/hooks/useBranchParams';
import { clearNodeBranchData } from '../../nodes/nodes.actions';
import { clearWorkflowBranchData } from '../../workflows/workflowsSlice';
import { selectContributionRequest } from '../contributionRequests.selectors';
import { mergeContributionRequest } from '../contributionRequests.thunks';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function useMerge() {
    const {
        id: nodeId,
        branchId: id,
    } = useParams();
    const { originalId } = useBranchParams();

    const { rootId } = useSelector(selectContributionRequest(nodeId as UUID, id as UUID));

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
                rootId,
                nodeId,
                id,
            }));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;

                handleServerError(error);
                console.error(error);

                return;
            }

            dispatch(clearNodeBranchData(nodeId));
            dispatch(clearWorkflowBranchData(nodeId));
            navigate(`/nodes/${originalId}/${nodeId}`);
            setTimeout(() => dispatch(setAlert({
                isOpen: true,
                severity: 'success',
                message: 'Contribution request merged successfully!',
            })), 250);
        }
        catch (error) {
            console.error(error);
        }
    }, [originalId, dispatch, handleServerError, id, navigate, nodeId, rootId]);
}
