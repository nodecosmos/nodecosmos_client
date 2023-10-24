import { FlowStep } from '../../features/flow-steps/types';
import { InputOutput } from '../../features/input-outputs/types';
import {
    FlowStepNode, Output, WorkflowStepFlow, WorkflowStep,
} from '../../features/workflows/types';
import { UUID } from '../../types';
import { buildOutputs, buildInputs } from './output';
import { calculateFlowStepNodePosition, calculateFlowStepPosition } from './positionCalculator';

export interface FlowStepData {
    flowId: UUID;
    flowSteps: FlowStep[];
    IOsById: Record<UUID, InputOutput>;
    prevWorkflowStep: WorkflowStep | null;
    prevOutputs: Output[];
    flowStartIndex: number;
    flowVerticalIndex: number;
    prefFlowYEnds: number;
}

interface WfFlowStepBuilderResult {
    workflowStepFlows: WorkflowStepFlow[];
    flowYEnd: number;
}

export function buildFlowStep(data: FlowStepData): WfFlowStepBuilderResult {
    const {
        flowId,
        flowSteps,
        flowStartIndex,
        flowVerticalIndex,
        prefFlowYEnds,
        prevOutputs,
    } = data;

    const workflowStepFlows: WorkflowStepFlow[] = [];
    let flowYEnd = 0;

    if (flowSteps.length === 0) {
        // init empty wf flow step, so we can create flow step
        workflowStepFlows.push({
            id: flowId,
            stepId: null,
            startIndex: flowStartIndex,
            verticalIndex: flowVerticalIndex,
            position: calculateFlowStepPosition({
                flowStep: null,
                flowStartIndex,
                stepIndex: 0,
                prefFlowYEnds,
            }),
            flowStepNodes: [],
        });
    }

    flowSteps.forEach((flowStep, stepIndex) => {
        const flowStepPosition = calculateFlowStepPosition({
            flowStep,
            flowStartIndex,
            stepIndex,
            prefFlowYEnds,
        });

        flowYEnd = Math.max(flowStepPosition.yEnd, flowYEnd);

        let prevNodeYEnd = 0;

        const flowStepNodes = flowStep.nodeIds.map((nodeId) => {
            const nodePosition = calculateFlowStepNodePosition({
                flowStepPosition,
                flowStep,
                nodeId,
                prevNodeYEnd,
            });

            const inputs = buildInputs({
                flowStep,
                nodeId,
                prevOutputs,
                nodePosition,
            });

            const outputs = buildOutputs({
                flowStep,
                nodePosition,
                nodeId,
                flowStepData: data,
            });

            const node: FlowStepNode = {
                id: nodeId,
                flowStepId: flowStep.id,
                inputs,
                outputs,
                position: nodePosition,
            };

            prevNodeYEnd = nodePosition.yEnd;

            return node;
        });

        workflowStepFlows.push({
            id: flowStep.flowId,
            stepId: flowStep.id,
            startIndex: flowStartIndex,
            verticalIndex: flowVerticalIndex,
            position: flowStepPosition,
            flowStepNodes,
        });
    });

    return { workflowStepFlows, flowYEnd };
}
