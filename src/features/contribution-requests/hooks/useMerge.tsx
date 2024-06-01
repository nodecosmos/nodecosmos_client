import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { setAlert } from '../../app/appSlice';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { clearDescBranchData } from '../../descriptions/descriptionsSlice';
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
    const { originalId } = useBranchContext();

    if (!nodeId) {
        throw new Error('Missing nodeId');
    }

    if (!id) {
        throw new Error('Missing branchId');
    }

    const cr = useSelector(selectContributionRequest(nodeId, id));
    const rootId = cr?.rootId;
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();
    const navigate = useNavigate();

    return useCallback(async () => {
        if (!rootId) {
            throw new Error('Missing rootId');
        }

        try {
            const response = await dispatch(mergeContributionRequest({
                rootId,
                nodeId,
                id,
            }));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;

                setTimeout(() => handleServerError(error), 250);
                console.error(error);

                return;
            }

            dispatch(clearNodeBranchData(rootId));
            dispatch(clearWorkflowBranchData(rootId));
            dispatch(clearDescBranchData(rootId));
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
