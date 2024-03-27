import { NodecosmosDispatch } from '../../../../../store';
import { ObjectType, UUID } from '../../../../../types';
import { selectSelectedObject } from '../../../../app/app.selectors';
import { setAlert } from '../../../../app/appSlice';
import { selectOptFlowStep } from '../../../../flow-steps/flowSteps.selectors';
import { updateFlowStepInputs } from '../../../../flow-steps/flowSteps.thunks';
import useWorkflowContext from '../../useWorkflowContext';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Hook to handle the change of inputs for a flow step node. It takes flow step from `selectSelectedWorkflowObject` and
 * it uses it to update the inputs of the flow step.
 * Inputs are added to `Workflow
 */
export default function useNodeInputsChange() {
    const selectedObject = useSelector(selectSelectedObject);
    const { branchId } = useWorkflowContext();

    const flowStep = useSelector(selectOptFlowStep(branchId, selectedObject?.metadata?.flowStepId));
    const dispatch: NodecosmosDispatch = useDispatch();

    return useCallback(async (selectedInputs: UUID[]) => {
        if (!selectedObject) {
            throw new Error('Selected object is not found');
        }

        const { objectNodeId, objectType } = selectedObject;

        if (objectType !== ObjectType.Node) {
            throw new Error('Selected object is not a node');
        }

        if (!flowStep) {
            throw new Error('Flow step primary key not found');
        }

        const flowStepPrimaryKey = {
            nodeId: flowStep.nodeId,
            branchId: flowStep.branchId,
            workflowId: flowStep.workflowId,
            flowId: flowStep.flowId,
            flowIndex: flowStep.flowIndex,
            id: flowStep.id,
        };

        try {
            const inputIdsByNodeId = { ...flowStep.inputIdsByNodeId };
            inputIdsByNodeId[objectNodeId] = selectedInputs;

            await dispatch(updateFlowStepInputs({
                ...flowStepPrimaryKey,
                inputIdsByNodeId,
            }));
        } catch (e) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'error',
                message: 'Failed to add output',
            }));

            console.error(e);
        }
    }, [dispatch, flowStep, selectedObject]);
}
