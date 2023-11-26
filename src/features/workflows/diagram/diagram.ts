import { buildFlow } from './flow';
import { buildInitialOutputs } from './output';
import { calculateWorkflowStepPosition } from './position';
import { WorkflowDiagram, WorkflowStep } from './types';
import { groupFlowStepsByFlowId } from '../../flow-steps/flowSteps.memoize';
import { FlowStep } from '../../flow-steps/types';
import { groupInputOutputsById } from '../../input-outputs/inputOutputs.memoize';
import { WorkflowData } from '../types';

export interface BuildWorkflowDiagramData {
    initialInputIds: WorkflowData['workflow']['initialInputIds'];
    flows: WorkflowData['flows'];
    flowSteps: WorkflowData['flowSteps'];
    inputOutputs: WorkflowData['inputOutputs'];
}

const initWorkflowStep = (stepIndex: number): WorkflowStep => ({
    index: stepIndex,
    position: calculateWorkflowStepPosition(stepIndex),
    flows: [],
    outputsById: {},
});

export function buildWorkflowDiagram(data: BuildWorkflowDiagramData): WorkflowDiagram {
    const {
        initialInputIds, flows = [], flowSteps = [], inputOutputs = [],
    } = data;

    const initialInputs = buildInitialOutputs(initialInputIds);
    const workflowSteps: WorkflowStep[] = [];

    let height = 0;

    if (flows.length === 0) {
        // init empty workflow step, so we can create flows
        workflowSteps[0] = initWorkflowStep(0);
    } else {
        // build workflow steps from flows
        const flowStepsByFlowId = groupFlowStepsByFlowId(flowSteps);
        const IOsById = groupInputOutputsById(inputOutputs);

        let prefFlowYEnd = 0;

        flows.forEach((flow, verticalIndex) => {
            let flowStartIndex = flow.startIndex;
            const hasEmptySteps = flow.startIndex > workflowSteps.length;

            if (hasEmptySteps) {
                flowStartIndex = workflowSteps.length;
            }

            const flowSteps: FlowStep[] = flowStepsByFlowId[flow.id] || [];

            const { workflowStepFlows, flowYEnd } = buildFlow({
                flowId: flow.id,
                flowSteps,
                IOsById,
                flowStartIndex,
                flowVerticalIndex: verticalIndex,
                prefFlowYEnd,
            });

            workflowStepFlows.forEach((workflowStepFlow, index) => {
                const wfIndex = flowStartIndex + index;

                workflowSteps[wfIndex] ||= initWorkflowStep(wfIndex);
                workflowSteps[wfIndex].flows.push(workflowStepFlow);

                // populate workflow step outputs
                workflowStepFlow.outputs.forEach((output) => {
                    workflowSteps[wfIndex].outputsById[output.id] = output;
                });
            });

            prefFlowYEnd = flowYEnd;
        });

        height = prefFlowYEnd;
    }

    // init workflow diagram
    return {
        initialInputs,
        workflowSteps,
        height,
    };
}
