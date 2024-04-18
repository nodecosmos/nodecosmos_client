import { NodecosmosDispatch } from '../../../store';
import { ObjectType } from '../../../types';
import { selectObject } from '../../app/app.thunks';
import { restoreFlow } from '../../branch/branches.thunks';
import useBranchParams from '../../branch/hooks/useBranchParams';
import useFlowContext, { FlowContext } from '../../workflows/hooks/diagram/flows/useFlowContext';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { deleteFlow, updateFlowTitle } from '../flows.thunks';
import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';

export default function useFlowActions() {
    const { branchId } = useWorkflowContext();
    const {
        id: flowId, nodeId, startIndex, verticalIndex,
    } = useFlowContext();
    const { currentBranchId } = useBranchParams();
    const {
        openTitleEdit,
        closeTitleEdit,
    } = useContext(FlowContext);
    const dispatch: NodecosmosDispatch = useDispatch();

    const handleFlowClick = useCallback(() => {
        dispatch(selectObject({
            currentOriginalBranchId: branchId,
            currentBranchId,
            objectNodeId: nodeId,
            branchId,
            objectId: flowId,
            objectType: ObjectType.Flow,
        }));
    }, [branchId, currentBranchId, dispatch, flowId, nodeId]);

    const deleteFlowCb = useCallback(() => {
        dispatch(deleteFlow({
            nodeId,
            branchId,
            startIndex,
            verticalIndex,
            id: flowId,
        }));
    }, [branchId, dispatch, flowId, nodeId, startIndex, verticalIndex]);

    const handleTitleChange = useCallback(async (newTitle: string) => {
        await dispatch(updateFlowTitle({
            nodeId,
            branchId,
            startIndex,
            verticalIndex,
            id: flowId,
            title: newTitle,
        }));
    }, [branchId, dispatch, flowId, nodeId, startIndex, verticalIndex]);

    const restoreFlowCb = useCallback(() => {
        dispatch(restoreFlow({
            branchId,
            objectId: flowId,
        }));
    }, [dispatch, branchId, flowId]);

    return {
        handleFlowClick,
        deleteFlowCb,
        handleTitleChange,
        openTitleEdit,
        closeTitleEdit,
        restoreFlow: restoreFlowCb,
    };
}
