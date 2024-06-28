import { NodecosmosDispatch } from '../../../store';
import { ObjectType } from '../../../types';
import { setAlert } from '../../app/appSlice';
import { useSelectObject } from '../../app/hooks/useSelectObject';
import { restoreFlow, undoDeleteFlow } from '../../branch/branches.thunks';
import useBranchContext from '../../branch/hooks/useBranchContext';
import useFlowContext, { FlowContext } from '../../workflows/hooks/diagram/flows/useFlowContext';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { deleteFlow, updateFlowTitle } from '../flows.thunks';
import {
    useCallback, useContext, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';

export default function useFlowActions() {
    const { rootId, insidePane } = useWorkflowContext();
    const {
        id: flowId, nodeId, startIndex, verticalIndex,
    } = useFlowContext();
    const { originalId, branchId } = useBranchContext();
    const {
        openTitleEdit,
        closeTitleEdit,
    } = useContext(FlowContext);
    const dispatch: NodecosmosDispatch = useDispatch();
    const selectObject = useSelectObject();

    const handleFlowClick = useCallback(() => {
        if (insidePane) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'warning',
                message: 'Cannot select workflow object in the pane for now. Please use node\'s workflow page.',
                duration: 5000,
            }));

            return;
        }

        selectObject({
            originalId,
            branchId,
            objectNodeId: nodeId,
            objectId: flowId,
            objectType: ObjectType.Flow,
        });
    }, [branchId, dispatch, flowId, insidePane, nodeId, originalId, selectObject]);

    const deleteFlowCb = useCallback(async () => {
        await dispatch(deleteFlow({
            rootId,
            nodeId,
            branchId,
            startIndex,
            verticalIndex,
            id: flowId,
        }));
    }, [rootId, branchId, dispatch, flowId, nodeId, startIndex, verticalIndex]);

    const handleTitleChange = useCallback(async (newTitle: string) => {
        await dispatch(updateFlowTitle({
            rootId,
            nodeId,
            branchId,
            startIndex,
            verticalIndex,
            id: flowId,
            title: newTitle,
        }));
    }, [rootId, branchId, dispatch, flowId, nodeId, startIndex, verticalIndex]);

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

    return useMemo(() => ({
        handleFlowClick,
        deleteFlowCb,
        handleTitleChange,
        openTitleEdit,
        closeTitleEdit,
        restoreFlow: restoreFlowCb,
        undoDeleteFlow: undoDeleteFlowCb,
    }), [
        closeTitleEdit,
        deleteFlowCb,
        handleFlowClick,
        handleTitleChange,
        openTitleEdit,
        restoreFlowCb,
        undoDeleteFlowCb,
    ]);
}
