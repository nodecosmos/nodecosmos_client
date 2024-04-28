import { NodecosmosDispatch } from '../../../store';
import { ObjectType } from '../../../types';
import { selectObject } from '../../app/app.thunks';
import { restoreFlow, undoDeleteFlow } from '../../branch/branches.thunks';
import useBranchParams from '../../branch/hooks/useBranchParams';
import useFlowContext, { FlowContext } from '../../workflows/hooks/diagram/flows/useFlowContext';
import { deleteFlow, updateFlowTitle } from '../flows.thunks';
import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';

export default function useFlowActions() {
    const {
        id: flowId, nodeId, startIndex, verticalIndex,
    } = useFlowContext();
    const { originalId, branchId } = useBranchParams();
    const {
        openTitleEdit,
        closeTitleEdit,
    } = useContext(FlowContext);
    const dispatch: NodecosmosDispatch = useDispatch();

    const handleFlowClick = useCallback(() => {
        dispatch(selectObject({
            originalId,
            branchId,
            objectNodeId: nodeId,
            objectId: flowId,
            objectType: ObjectType.Flow,
        }));
    }, [branchId, dispatch, flowId, nodeId, originalId]);

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

    const undoDeleteFlowCb = useCallback(() => {
        dispatch(undoDeleteFlow({
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
        undoDeleteFlow: undoDeleteFlowCb,
    };
}
