import useIoContext, { IoContext } from './useIoContext';
import { NodecosmosDispatch } from '../../../../../store';
import { ObjectType, UUID } from '../../../../../types';
import { selectObject } from '../../../../app/app.thunks';
import { undoDeleteIo } from '../../../../branch/branches.thunks';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import { deleteIo, updateIoTitle } from '../../../../input-outputs/inputOutputs.thunks';
import { WorkflowDiagramContext } from '../../../constants';
import useWorkflowContext from '../../useWorkflowContext';
import useInputsChange from '../flow-step-node/useInputsChange';
import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';

export default function useIoActions() {
    const {
        branchId,
        context: workflowContext,
        inputsAdditionActive,
        selectedInputs,
        setSelectedInputs,
        nodeId,
    } = useWorkflowContext();
    const {
        id, rootId, mainId,
    } = useIoContext();
    const { currentBranchId } = useBranchParams();
    const {
        openTitleEdit,
        closeTitleEdit,
    } = useContext(IoContext);
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleInputsChange = useInputsChange();
    const isChecked = selectedInputs.has(id);

    const handleIoClick = useCallback(async () => {
        if (inputsAdditionActive) {
            let selectedInputsArray = Array.from(selectedInputs);

            if (isChecked) {
                setSelectedInputs((prev: Set<UUID>) => {
                    const newSet = new Set(prev);
                    newSet.delete(id);

                    return newSet;
                });

                selectedInputsArray = selectedInputsArray.filter((inputId) => inputId !== id);
            } else {
                setSelectedInputs((prev) => new Set(prev).add(id));
                selectedInputsArray.push(id);
            }

            await handleInputsChange(selectedInputsArray);
        } else if (workflowContext === WorkflowDiagramContext.workflowPage) {
            dispatch(selectObject({
                currentOriginalBranchId: branchId,
                currentBranchId,
                objectNodeId: nodeId,
                branchId,
                objectId: id,
                objectType: ObjectType.Io,
                metadata: { mainObjectId: mainId },
            }));
        }
    },
    [
        branchId,
        currentBranchId,
        dispatch,
        handleInputsChange,
        id,
        mainId,
        inputsAdditionActive,
        isChecked,
        nodeId,
        selectedInputs,
        setSelectedInputs,
        workflowContext,
    ]);

    const deleteIoCb = useCallback(() => {
        dispatch(deleteIo({
            currentBranchId,
            rootId,
            nodeId,
            branchId,
            id,
        }));
    }, [branchId, currentBranchId, dispatch, id, nodeId, rootId]);

    const handleTitleChange = useCallback(async (newTitle: string) => {
        await dispatch(updateIoTitle({
            mainId,
            currentBranchId,
            rootId,
            nodeId,
            branchId,
            id,
            title: newTitle,
        }));
    }, [branchId, currentBranchId, dispatch, id, mainId, nodeId, rootId]);

    const undoDeleteIoCb = useCallback(() => {
        dispatch(undoDeleteIo({
            branchId,
            objectId: id,
        }));
    }, [dispatch, branchId, id]);

    return {
        handleIoClick,
        deleteIoCb,
        handleTitleChange,
        openTitleEdit,
        closeTitleEdit,
        undoDeleteIo: undoDeleteIoCb,
    };
}
