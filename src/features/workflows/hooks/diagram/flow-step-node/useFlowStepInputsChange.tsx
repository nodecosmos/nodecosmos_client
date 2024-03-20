import { NodecosmosDispatch } from '../../../../../store';
import { UUID } from '../../../../../types';
import { setAlert } from '../../../../app/appSlice';
import { selectOptFlowStep } from '../../../../flow-steps/flowSteps.selectors';
import { updateFlowStepInputs } from '../../../../flow-steps/flowSteps.thunks';
import { selectSelectedWorkflowObject } from '../../../workflow.selectors';
import { WorkflowDiagramObject, WorkflowDiagramObjectType } from '../../../workflow.types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Hook to handle the change of inputs for a flow step node. It takes flow step from `selectSelectedWorkflowObject` and
 * it uses it to update the inputs of the flow step.
 * Inputs are added to `Workflow
 */
export default function useFlowStepInputsChange() {
    const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowObject);
    const {
        branchId, id: nodeId, flowStepId, type,
    } = selectedWorkflowDiagramObject as WorkflowDiagramObject;
    const flowStep = useSelector(selectOptFlowStep(branchId, flowStepId));
    const dispatch: NodecosmosDispatch = useDispatch();

    return useCallback(async (selectedInputs: UUID[]) => {
        if (type !== WorkflowDiagramObjectType.Node) {
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
            inputIdsByNodeId[nodeId] = selectedInputs;

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
    }, [dispatch, flowStep, nodeId, type]);
}
