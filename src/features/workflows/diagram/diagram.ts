import { WorkflowDiagram, WorkflowStep } from './diagram.types';
import { buildFlow } from './flow';
import { buildInitialInputs } from './output';
import { calculateWorkflowStepPosition } from './position';
import { groupFlowStepsByFlowId } from '../../flow-steps/flowSteps.memoize';
import { FlowStep } from '../../flow-steps/flowSteps.types';
import { groupInputOutputsById } from '../../input-outputs/inputOutputs.memoize';
import { WorkflowData } from '../workflow.types';

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
    outputIds: new Set(),
});

export function buildWorkflowDiagram(data: BuildWorkflowDiagramData): WorkflowDiagram {
    const {
        initialInputIds, flows = [], flowSteps = [], inputOutputs = [],
    } = data;

    const outputsById: WorkflowDiagram['outputsById'] = {};
    const initialInputs = buildInitialInputs(initialInputIds);
    const workflowSteps: WorkflowStep[] = [];

    initialInputs.forEach((input) => {
        outputsById[input.id] = input;
    });

    let height = 0;

    if (flows.length === 0) {
        // init empty workflow step, so we can create flows
        workflowSteps[0] = initWorkflowStep(0);
    } else {
        // build workflow steps from flows
        const flowStepsByFlowId = groupFlowStepsByFlowId(flowSteps);
        const IosById = groupInputOutputsById(inputOutputs);

        let prefFlowYEnd = 0;

        flows.forEach((flow, verticalIndex) => {
            let flowStartIndex = flow.startIndex;
            const hasEmptySteps = flow.startIndex > workflowSteps.length;

            if (hasEmptySteps) {
                flowStartIndex = workflowSteps.length;
            }

            const flowSteps: FlowStep[] = flowStepsByFlowId[flow.id] || [];

            const { workflowStepFlows, currentFlowYEnd } = buildFlow({
                flowId: flow.id,
                flowSteps,
                IosById,
                flowStartIndex,
                flowVerticalIndex: verticalIndex,
                prefFlowYEnd,
            });

            workflowStepFlows.forEach((workflowStepFlow, index) => {
                const wfIndex = flowStartIndex + index;

                workflowSteps[wfIndex] ||= initWorkflowStep(wfIndex);
                workflowSteps[wfIndex].flows.push(workflowStepFlow);

                // populate outputs
                workflowStepFlow.outputs.forEach((output) => {
                    outputsById[output.id] = output;
                    workflowSteps[wfIndex].outputIds.add(output.id);
                });

                // update yEnd of each flow step to highest yEnd within the flow
                workflowStepFlow.position.yEnd = currentFlowYEnd;
            });

            prefFlowYEnd = currentFlowYEnd;
        });

        height = prefFlowYEnd;
    }

    // init workflow diagram
    return {
        initialInputs,
        workflowSteps,
        outputsById,
        height,
    };
}
