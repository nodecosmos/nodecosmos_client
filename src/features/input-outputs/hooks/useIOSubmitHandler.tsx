import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError, Strict } from '../../../types';
import { setAlert } from '../../app/appSlice';
import { updateFlowStepOutputs } from '../../flow-steps/flowSteps.thunks';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { updateWorkflowInitialInputs } from '../../workflows/worfklow.thunks';
import { CreateIOModalProps } from '../components/CreateIOModal';
import { selectUniqueIOByRootNodeId } from '../inputOutputs.selectors';
import { createIO } from '../inputOutputs.thunks';
import { InputOutput, InsertInputOutputPayload } from '../inputOutputs.types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useIOSubmitHandler(props: CreateIOModalProps, autocompleteValue: string | null) {
    const {
        id: workflowId, nodeId, rootNodeId, initialInputIds: currentInitialInputIds,
    } = useWorkflowContext();

    const [loading, setLoading] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const allWorkflowIOs = useSelector(selectUniqueIOByRootNodeId(rootNodeId));
    const handleServerError = useHandleServerErrorAlert();

    const onSubmit = async (formValues: { title: string }) => {
        setLoading(true);
        const existingIO = autocompleteValue ? allWorkflowIOs.find((io) => io.title === autocompleteValue) : null;

        const payload: Strict<InsertInputOutputPayload> = {
            nodeId,
            workflowId,
            rootNodeId,
            originalId: (autocompleteValue && existingIO?.id) || null,
            flowStepId: props.flowStepPrimaryKey?.id,
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
            if (props.associatedObject === 'workflow') {
                const initialInputIds = [...currentInitialInputIds, inputOutput.id] || [inputOutput.id];

                await dispatch(updateWorkflowInitialInputs({
                    nodeId,
                    id: workflowId,
                    initialInputIds,
                }));
            }

            if (props.associatedObject === 'flowStep') {
                const { outputIdsByNodeId, outputNodeId } = props;
                const currentNodeOutputIds = outputIdsByNodeId[outputNodeId] || [];
                const newOutputIdsByNodeId = { ...outputIdsByNodeId } || {};

                newOutputIdsByNodeId[outputNodeId] = [...currentNodeOutputIds, inputOutput.id];

                await dispatch(updateFlowStepOutputs({
                    ...props.flowStepPrimaryKey,
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
    };

    return {
        onSubmit,
        loading,
    };
}
