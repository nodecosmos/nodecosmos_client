import { NodecosmosDispatch } from '../../../../../store';
import { UUID } from '../../../../../types';
import { setAlert } from '../../../../app/appSlice';
import { selectFlowStep, selectFlowStepPrimaryKey } from '../../../../flow-steps/flowSteps.selectors';
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
        id: nodeId, flowStepId, type,
    } = selectedWorkflowDiagramObject as WorkflowDiagramObject;
    const flowStepPrimaryKey = useSelector(selectFlowStepPrimaryKey(flowStepId as UUID));
    const flowStep = useSelector(selectFlowStep(flowStepId as UUID));
    const dispatch: NodecosmosDispatch = useDispatch();

    return useCallback(async (selectedInputs: UUID[]) => {
        if (type !== WorkflowDiagramObjectType.Node) {
            throw new Error('Selected object is not a node');
        }

        if (!flowStepPrimaryKey) {
            throw new Error('Flow step primary key not found');
        }

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
    }, [dispatch, flowStep, flowStepPrimaryKey, nodeId, type]);
}
