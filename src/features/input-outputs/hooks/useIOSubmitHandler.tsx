import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError, Strict } from '../../../types';
import { setAlert } from '../../app/appSlice';
import { updateFlowStepOutputs } from '../../flow-steps/flowSteps.thunks';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { updateWorkflowInitialInputs } from '../../workflows/worfklow.thunks';
import { CreateIOModalProps, IoObjectTypes } from '../components/CreateIOModal';
import { selectUniqueIOByRootNodeId } from '../inputOutputs.selectors';
import { createIO } from '../inputOutputs.thunks';
import { InputOutput, InsertInputOutputPayload } from '../inputOutputs.types';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useIOSubmitHandler(props: CreateIOModalProps, autocompleteValue: string | null) {
    const {
        associatedObject,
        flowStepPrimaryKey,
        outputNodeId,
        outputIdsByNodeId,
    } = props;
    const {
        branchId, id: workflowId, nodeId, rootNodeId, initialInputIds: currentInitialInputIds,
    } = useWorkflowContext();

    const [loading, setLoading] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const allWorkflowIOs = useSelector(selectUniqueIOByRootNodeId(branchId, rootNodeId));
    const handleServerError = useHandleServerErrorAlert();

    const onSubmit = useCallback(async (formValues: { title: string }) => {
        setLoading(true);
        const existingIO = autocompleteValue ? allWorkflowIOs.find((io) => io.title === autocompleteValue) : null;

        const payload: Strict<InsertInputOutputPayload> = {
            nodeId,
            branchId,
            workflowId,
            rootNodeId,
            originalId: (autocompleteValue && existingIO?.id) || null,
            flowStepId: flowStepPrimaryKey?.id ?? null,
            ...formValues,
        };

        const response = await dispatch(createIO(payload));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            console.error(error);

            return;
        }

        const inputOutput = response.payload as InputOutput;

        try {
            if (associatedObject === IoObjectTypes.startStep) {
                const initialInputIds = [...currentInitialInputIds, inputOutput.id] || [inputOutput.id];

                await dispatch(updateWorkflowInitialInputs({
                    nodeId,
                    branchId,
                    id: workflowId,
                    initialInputIds,
                }));
            }

            if (associatedObject === IoObjectTypes.flowStep) {
                if (!flowStepPrimaryKey || !outputNodeId || !outputIdsByNodeId) {
                    throw new Error('Flow step props are required');
                }

                const currentNodeOutputIds = outputIdsByNodeId[outputNodeId] || [];
                const newOutputIdsByNodeId = { ...outputIdsByNodeId } || {};

                newOutputIdsByNodeId[outputNodeId] = [...currentNodeOutputIds, inputOutput.id];

                await dispatch(updateFlowStepOutputs({
                    ...flowStepPrimaryKey,
                    outputIdsByNodeId: newOutputIdsByNodeId,
                }));
            }
        } catch (e) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'error',
                message: 'Failed to add output',
            }));

            console.error(e);
        }

        setTimeout(() => setLoading(false), 500);

        props.onClose();
    },
    [
        autocompleteValue, allWorkflowIOs, nodeId, branchId, workflowId, rootNodeId, associatedObject,
        flowStepPrimaryKey, dispatch, props, handleServerError, currentInitialInputIds, outputIdsByNodeId, outputNodeId,
    ]);

    return {
        onSubmit,
        loading,
    };
}
