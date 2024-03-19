import {
    FlowStepNode, Output, WorkflowStepFlow,
} from './diagram.types';
import { buildOutputs } from './output';
import { calculateFlowStepNodePosition, calculateFlowStepPosition } from './position';
import { UUID } from '../../../types';
import { FlowStep } from '../../flow-steps/flowSteps.types';
import { InputOutput } from '../../input-outputs/inputOutputs.types';
import { FLOW_BUFFER } from '../constants';

export interface FlowStepData {
    flowId: UUID;
    flowSteps: FlowStep[];
    IOsById: Record<UUID, InputOutput>;
    flowStartIndex: number;
    flowVerticalIndex: number;
    prefFlowYEnd: number;
}

interface FlowRes {
    workflowStepFlows: WorkflowStepFlow[];
    flowYEnd: number;
}

export function buildFlow(data: FlowStepData): FlowRes {
    const {
        flowId,
        flowSteps,
        flowStartIndex,
        flowVerticalIndex,
        prefFlowYEnd,
    } = data;

    const workflowStepFlows: WorkflowStepFlow[] = [];
    let flowYEnd = prefFlowYEnd;

    if (flowSteps.length === 0) {
        // append one empty flow step
        workflowStepFlows.push({
            id: flowId,
            stepId: null,
            startIndex: flowStartIndex,
            verticalIndex: flowVerticalIndex,
            position: calculateFlowStepPosition({
                flowStep: null,
                flowStartIndex,
                stepIndex: 0,
                prefFlowYEnd,
            }),
            flowStepNodes: [],
            outputs: [],
            prevFlowStepId: null,
            nextFlowStepId: null,
        });
    } else {
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

            const prevFlowStepId = flowSteps[stepIndex - 1]?.id;
            const nextFlowStepId = flowSteps[stepIndex + 1]?.id;

            workflowStepFlows.push({
                id: flowStep.flowId,
                stepId: flowStep.id,
                startIndex: flowStartIndex,
                verticalIndex: flowVerticalIndex,
                position: flowStepPosition,
                flowStepNodes,
                outputs: flowOutputs,
                prevFlowStepId,
                nextFlowStepId,
            });
        });
    }

    return {
        workflowStepFlows,
        flowYEnd: flowYEnd + FLOW_BUFFER,
    };
}
