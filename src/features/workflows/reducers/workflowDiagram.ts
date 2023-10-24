import { PayloadAction } from '@reduxjs/toolkit';
import { WorkflowState, WorkflowStep } from '../types';
import { ShowWorkflowResponse } from '../workflows.thunks';
import { FlowStep } from '../../flow-steps/types';
import { UUID } from '../../../types';
import { groupFlowStepsByFlowId } from '../../flow-steps/flowSteps.memoize';
import { groupInputOutputsById } from '../../input-outputs/inputOutputs.memoize';
import { calculateWorkflowStepPosition } from '../../../services/workflow-diagram/positionCalculator';
import { buildFlowStep } from '../../../services/workflow-diagram/flowStep';
import { buildInitialOutputs } from '../../../services/workflow-diagram/output';

export function buildWorkflowDiagram(state: WorkflowState, action: PayloadAction<ShowWorkflowResponse>) {
    const {
        workflow, flows, flowSteps, inputOutputs,
    } = action.payload;

    const initialInputs = buildInitialOutputs(workflow.initialInputIds);
    const workflowSteps: WorkflowStep[] = [];

    if (flows.length === 0) {
        // init empty workflow step, so we can create flows
        workflowSteps.push({
            index: 0,
            position: calculateWorkflowStepPosition(0, 0),
            flows: [],
            outputs: [],
        });

    } else {
        // build workflow steps from flows
        const flowStepsByFlowId: Record<UUID, FlowStep[]> = groupFlowStepsByFlowId(flowSteps);
        const IOsById = groupInputOutputsById(inputOutputs);

        let prefFlowYEnds = 0;

        flows.forEach((flow, verticalIndex) => {
            const prevWorkflowStep = workflowSteps[workflowSteps.length - 1];
            const hasEmptySteps = flow.startIndex > workflowSteps.length;
            const prevOutputs = prevWorkflowStep ? prevWorkflowStep.outputs : initialInputs;

            let adjustedIndex = flow.startIndex;
            if (hasEmptySteps) {
                adjustedIndex = workflowSteps.length;
            }

            const currFlowSteps: FlowStep[] = flowStepsByFlowId[flow.id] || [];

            const { workflowStepFlows, flowYEnd } = buildFlowStep({
                flowId: flow.id,
                flowSteps: currFlowSteps,
                IOsById,
                prevWorkflowStep,
                prevOutputs,
                flowStartIndex: adjustedIndex,
                flowVerticalIndex: verticalIndex,
                prefFlowYEnds,
            });

            // init workflow step
            workflowSteps[adjustedIndex] ||= {
                index: adjustedIndex,
                position: calculateWorkflowStepPosition(adjustedIndex, prefFlowYEnds),
                flows: workflowStepFlows,
                outputs: [],
            };

            prefFlowYEnds = flowYEnd;
        });
    }

    // init workflow diagram
    state.workflowDiagramById[workflow.id] = {
        initialInputs,
        workflowSteps,
    };
}
