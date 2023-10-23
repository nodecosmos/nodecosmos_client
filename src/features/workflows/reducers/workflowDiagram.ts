import {PayloadAction} from '@reduxjs/toolkit';
import {WorkflowState, WorkflowStep} from '../types';
import {ShowWorkflowResponse} from '../workflows.thunks';
import {FlowStep} from '../../flow-steps/types';
import {UUID} from '../../../types';
import {groupFlowStepsByFlowId} from '../../flow-steps/flowSteps.memoize';
import {inputOutputsById} from '../../input-outputs/inputOutputs.memoize';
import {calculateWorkflowStepPosition} from './workflow-diagram/positionCalculator';
import {buildFlowStep} from "./workflow-diagram/flowStep";
import {buildInitialOutputs} from "./workflow-diagram/output";

export function buildWorkflowDiagram(state: WorkflowState, action: PayloadAction<ShowWorkflowResponse>) {
    const { workflow, flows, flowSteps, inputOutputs } = action.payload;
    const flowStepsByFlowId: Record<UUID, FlowStep[]> = groupFlowStepsByFlowId(flowSteps);
    const IOsById = inputOutputsById(inputOutputs);
    const workflowSteps: WorkflowStep[] = [];
    const initialOutputs = buildInitialOutputs(workflow.initialInputIds);

    let prefFlowYEnds = 0;

    flows.forEach((flow, index) => {
        const prevWorkflowStep = index > 0 ? workflowSteps[workflowSteps.length - 1] : null;
        let adjustedIndex = flow.startIndex;

        if (index > 0 && !prevWorkflowStep) {
            adjustedIndex = workflowSteps.length;
        }

        const currFlowSteps = flowStepsByFlowId[flow.id];
        const prevOutputs = prevWorkflowStep ? prevWorkflowStep.outputs : initialOutputs;

        const { wfFlowSteps, flowYEnd } = buildFlowStep({
            flowSteps: currFlowSteps,
            IOsById,
            prevWorkflowStep,
            prevOutputs,
            flowStartIndex: adjustedIndex,
            prefFlowYEnds,
        });

        workflowSteps[adjustedIndex] ||= {
            index: adjustedIndex,
            position: calculateWorkflowStepPosition(adjustedIndex, prefFlowYEnds),
            flowSteps: wfFlowSteps,
            outputs: [],
        };

        prefFlowYEnds = flowYEnd;
    });

    state.workflowDiagramById[workflow.id] = {
        initialOutputs,
        workflowSteps,
    };
}
