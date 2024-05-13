import useIoContext, { IoContext } from './useIoContext';
import { NodecosmosDispatch } from '../../../../../store';
import { ObjectType, UUID } from '../../../../../types';
import { setAlert } from '../../../../app/appSlice';
import useSelectObject from '../../../../app/hooks/useSelectObject';
import { undoDeleteIo } from '../../../../branch/branches.thunks';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import { deleteIo, updateIoTitle } from '../../../../input-outputs/inputOutputs.thunks';
import useWorkflowContext from '../../useWorkflowContext';
import useInputsChange from '../flow-step-node/useInputsChange';
import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';

export default function useIoActions() {
    const {
        insidePane,
        inputsAdditionActive,
        selectedInputs,
        setSelectedInputs,
        nodeId,
    } = useWorkflowContext();
    const {
        id, rootId, mainId,
    } = useIoContext();
    const { originalId, branchId } = useBranchContext();
    const {
        openTitleEdit,
        closeTitleEdit,
    } = useContext(IoContext);
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleInputsChange = useInputsChange();
    const isChecked = selectedInputs.has(id);
    const selectObject = useSelectObject();

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
        } else {
            if (insidePane) {
                dispatch(setAlert({
                    isOpen: true,
                    severity: 'warning',
                    message: 'Cannot select workflow object in the pane for now. Please use workflow page.',
                    duration: 5000,
                }));

                return;
            }

            selectObject({
                originalId,
                branchId,
                objectNodeId: nodeId,
                objectId: id,
                objectType: ObjectType.Io,
                metadata: { mainObjectId: mainId },
            });
        }
    },
    [
        originalId,
        branchId,
        dispatch,
        handleInputsChange,
        id,
        mainId,
        inputsAdditionActive,
        isChecked,
        nodeId,
        selectedInputs,
        setSelectedInputs,
        insidePane,
        selectObject,
    ]);

    const deleteIoCb = useCallback(async () => {
        await dispatch(deleteIo({
            branchId,
            rootId,
            nodeId,
            id,
        }));
    }, [branchId, dispatch, id, nodeId, rootId]);

    const handleTitleChange = useCallback(async (newTitle: string) => {
        await dispatch(updateIoTitle({
            mainId,
            branchId,
            rootId,
            nodeId,
            id,
            title: newTitle,
        }));
    }, [branchId, dispatch, id, mainId, nodeId, rootId]);

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
