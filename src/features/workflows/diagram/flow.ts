import { FlowStep } from '../../flow-steps/types';
import { InputOutput } from '../../input-outputs/types';
import { UUID } from '../../../types';
import { buildOutputs } from './output';
import { calculateFlowStepNodePosition, calculateFlowStepPosition } from './position';
import {
    FlowStepNode, Output, WorkflowStepFlow,
} from './types';

export interface FlowStepData {
    flowId: UUID;
    flowSteps: FlowStep[];
    IOsById: Record<UUID, InputOutput>;
    flowStartIndex: number;
    flowVerticalIndex: number;
    prefFlowYEnd: number;
}

interface WfFlowStepBuilderResult {
    workflowStepFlows: WorkflowStepFlow[];
    flowYEnd: number;
}

export function buildFlow(data: FlowStepData): WfFlowStepBuilderResult {
    const {
        flowId,
        flowSteps,
        flowStartIndex,
        flowVerticalIndex,
        prefFlowYEnd,
    } = data;

    const workflowStepFlows: WorkflowStepFlow[] = [];
    let flowYEnd = prefFlowYEnd;

    flowSteps.forEach((flowStep, stepIndex) => {
        const flowStepPosition = calculateFlowStepPosition({
            flowStep,
            flowStartIndex,
            stepIndex,
            prefFlowYEnd,
        });

        flowYEnd = Math.max(flowStepPosition.yEnd, flowYEnd);

        let prevNodeYEnd = 0;
        const flowOutputs: Output[] = [];

        const flowStepNodes = flowStep?.nodeIds?.map((nodeId) => {
            const nodePosition = calculateFlowStepNodePosition({
                flowStepPosition,
                flowStep,
                nodeId,
                prevNodeYEnd,
            });

            const outputs = buildOutputs({
                flowStep,
                nodePosition,
                nodeId,
                flowStepData: data,
            });

            // collect all outputs from all nodes
            flowOutputs.push(...outputs);

            const node: FlowStepNode = {
                id: nodeId,
                flowStepId: flowStep.id,
                inputIds: flowStep.inputIdsByNodeId[nodeId] || [],
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
            outputs: flowOutputs,
        });
    });

    // append one empty flow step at the end
    workflowStepFlows.push({
        id: flowId,
        stepId: null,
        startIndex: flowStartIndex,
        verticalIndex: flowVerticalIndex,
        position: calculateFlowStepPosition({
            flowStep: null,
            flowStartIndex,
            stepIndex: flowSteps.length,
            prefFlowYEnd,
        }),
        flowStepNodes: [],
        outputs: [],
    });

    return { workflowStepFlows, flowYEnd };
}
