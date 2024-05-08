import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { setAlert } from '../../app/appSlice';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { updateFlowStepOutputs } from '../../flow-steps/flowSteps.thunks';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { updateWorkflowInitialInputs } from '../../workflows/worfklow.thunks';
import { CreateIoModalProps, IoObjectType } from '../components/CreateIoModal';
import { selectUniqueIoByRootId } from '../inputOutputs.selectors';
import { createIo } from '../inputOutputs.thunks';
import { InputOutput } from '../inputOutputs.types';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useIoSubmitHandler(props: CreateIoModalProps, autocompleteValue: string | null) {
    const {
        associatedObject,
        flowStepPrimaryKey,
        outputNodeId,
        outputIdsByNodeId,
    } = props;
    const {
        nodeId, rootId, initialInputIds: currentInitialInputIds,
    } = useWorkflowContext();
    const { branchId } = useBranchContext();
    const [loading, setLoading] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const allWorkflowIos = useSelector(selectUniqueIoByRootId(branchId, rootId));
    const handleServerError = useHandleServerErrorAlert();

    const onSubmit = useCallback(async (formValues: { title: string }) => {
        setLoading(true);
        const existingIo = autocompleteValue ? allWorkflowIos.find((io) => io.title === autocompleteValue) : null;

        const payload = {
            nodeId,
            branchId,
            rootId,
            mainId: (autocompleteValue && existingIo?.id) || nodeId,
            flowId: flowStepPrimaryKey?.flowId ?? null,
            flowStepId: flowStepPrimaryKey?.id ?? null,
            ...formValues,
        };

        const response = await dispatch(createIo(payload));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            console.error(error);

            return;
        }

        const inputOutput = response.payload as InputOutput;

        try {
            if (associatedObject === IoObjectType.startStep) {
                const initialInputIds = [...currentInitialInputIds, inputOutput.id] || [inputOutput.id];

                await dispatch(updateWorkflowInitialInputs({
                    rootId,
                    nodeId,
                    branchId,
                    initialInputIds,
                }));
            }

            if (associatedObject === IoObjectType.flowStep) {
                if (!flowStepPrimaryKey || !outputNodeId || !outputIdsByNodeId) {
                    throw new Error('Flow step props are required');
                }

                const currentNodeOutputIds = outputIdsByNodeId[outputNodeId] || [];
                const newOutputIdsByNodeId = { ...outputIdsByNodeId } || {};

                newOutputIdsByNodeId[outputNodeId] = [...currentNodeOutputIds, inputOutput.id];

                await dispatch(updateFlowStepOutputs({
                    ...flowStepPrimaryKey,
                    rootId,
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
        autocompleteValue, allWorkflowIos, nodeId, branchId, rootId, associatedObject,
        flowStepPrimaryKey, dispatch, props, handleServerError, currentInitialInputIds, outputIdsByNodeId, outputNodeId,
    ]);

    return {
        onSubmit,
        loading,
    };
}
