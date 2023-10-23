import { FlowStep } from '../../../flow-steps/types';
import { InputOutput } from '../../../input-outputs/types';
import {FlowStepNode, Output, WfFlowStep, WorkflowStep} from '../../types';
import { UUID } from '../../../../types';
import {buildOutputs, buildInputs} from './output';
import {calculateFlowStepNodePosition, calculateFlowStepPosition} from './positionCalculator';

export interface FlowStepData {
    flowSteps: FlowStep[];
    IOsById: Record<UUID, InputOutput>;
    prevWorkflowStep: WorkflowStep | null;
    prevOutputs: Output[];
    flowStartIndex: number;
    prefFlowYEnds: number;
}

export interface WfFlowStepBuilderResult {
    wfFlowSteps: WfFlowStep[];
    flowYEnd: number;
}

export function buildFlowStep(data: FlowStepData): WfFlowStepBuilderResult {
    const {
        flowSteps,
        flowStartIndex,
        prefFlowYEnds,
        prevOutputs,
    } = data;

    const wfFlowSteps: WfFlowStep[] = [];
    let flowYEnd = 0;

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
                prevOutputs: prevOutputs,
            });

            const outputs = buildOutputs({
                flowStep,
                nodePosition,
                nodeId,
                flowStepData: data
            });

            const node: FlowStepNode = {
                id: nodeId,
                flowStepId: flowStep.id,
                inputs,
                outputs,
                position: calculateFlowStepNodePosition({
                    flowStepPosition,
                    flowStep,
                    nodeId,
                    prevNodeYEnd,
                }),
            };

            prevNodeYEnd = nodePosition.yEnd;

            return node;
        });

        wfFlowSteps.push({
            id: flowStep.id,
            flowId: flowStep.flowId,
            startIndex: flowStartIndex,
            position: flowStepPosition,
            flowStepNodes,
        });
    });

    return {wfFlowSteps, flowYEnd};
}
