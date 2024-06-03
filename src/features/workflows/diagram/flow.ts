import {
    FlowStepNode, Output, WorkflowStepFlow,
} from './diagram.types';
import { buildOutputs } from './output';
import { calculateFlowStepNodePosition, calculateFlowStepPosition } from './position';
import { UUID } from '../../../types';
import { FlowStep } from '../../flow-steps/flowSteps.types';
import { InputOutput } from '../../input-outputs/inputOutputs.types';

export interface FlowStepData {
    flowId: UUID;
    flowSteps: FlowStep[];
    IosById: Record<UUID, InputOutput>;
    flowStartIndex: number;
    flowVerticalIndex: number;
    prefFlowYEnd: number;
}

interface FlowRes {
    workflowStepFlows: WorkflowStepFlow[];
    currentFlowYEnd: number;
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
    let currentFlowYEnd = prefFlowYEnd;

    if (flowSteps.length === 0) {
        // append one empty flow step

        const empty = calculateFlowStepPosition({
            flowStep: null,
            flowStartIndex,
            prefFlowYEnd,
            workflowStepIndex: flowStartIndex,
        });

        workflowStepFlows.push({
            id: flowId,
            stepId: null,
            startIndex: flowStartIndex,
            verticalIndex: flowVerticalIndex,
            position: empty,
            flowStepNodes: [],
            outputs: [],
            inputIds: [],
            prevStepIndex: null,
            nextStepIndex: null,
        });

        currentFlowYEnd = Math.max(empty.yEnd, currentFlowYEnd);
    } else {
        flowSteps.forEach((flowStep, stepIndex) => {
            const flowStepPosition = calculateFlowStepPosition({
                flowStep,
                flowStartIndex,
                prefFlowYEnd,
                currentFlowYEnd,
                workflowStepIndex: flowStartIndex + stepIndex,
            });

            currentFlowYEnd = Math.max(flowStepPosition.yEnd, currentFlowYEnd);

            let prevNodeYEnd = 0;
            const flowInputIds: UUID[] = [];
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

                // collect all inputs from all nodes
                flowStep.inputIdsByNodeId?.[nodeId]?.forEach((inputId) => {
                    flowInputIds.push(inputId);
                });

                const node: FlowStepNode = {
                    id: nodeId,
                    flowStepId: flowStep.id,
                    inputIds: flowStep.inputIdsByNodeId?.[nodeId] || [],
                    outputs,
                    position: nodePosition,
                };

                prevNodeYEnd = nodePosition.yEnd;

                return node;
            });

            const prevStepIndex = flowSteps[stepIndex - 1]?.stepIndex || null;
            const nextStepIndex = flowSteps[stepIndex + 1]?.stepIndex || null;

            workflowStepFlows.push({
                id: flowStep.flowId,
                stepId: flowStep.id,
                startIndex: flowStartIndex,
                verticalIndex: flowVerticalIndex,
                position: flowStepPosition,
                flowStepNodes,
                outputs: flowOutputs,
                inputIds: flowInputIds,
                prevStepIndex,
                nextStepIndex,
            });
        });
    }

    return {
        workflowStepFlows,
        currentFlowYEnd,
    };
}
