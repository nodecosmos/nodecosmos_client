import { Position } from '../../../../types';
import {
    EDGE_LENGTH, MARGIN_LEFT,
    NODE_BUTTON_HEIGHT,
    OUTPUT_EDGE_LENGTH,
    OUTPUT_BUTTON_WIDTH,
    WORKFLOW_STEP_WIDTH
} from '../../workflows.constants';
import {FlowStep} from "../../../flow-steps/types";

export function calculateWorkflowStepPosition(index: number, lastFlowYEnds: number): Position {
    return {
        x: WORKFLOW_STEP_WIDTH * (index + 1),
        xEnd: WORKFLOW_STEP_WIDTH * (index + 1) + WORKFLOW_STEP_WIDTH,
        y: lastFlowYEnds,
        yEnd: lastFlowYEnds,
    };
}

export interface FlowStepPositionData {
    flowStep: FlowStep;
    flowStartIndex: number;
    stepIndex: number;
    prefFlowYEnds: number;
}

export function calculateFlowStepPosition(data: FlowStepPositionData): Position {
    const {
        flowStep,
        flowStartIndex,
        stepIndex,
        prefFlowYEnds,
    } = data;

    const nodeLength = flowStep.nodeIds.length;
    const outputsLength = Object.values(flowStep.outputIdsByNodeId).flat().length;

    return {
        x: WORKFLOW_STEP_WIDTH * (flowStartIndex + stepIndex  + 1),
        xEnd: WORKFLOW_STEP_WIDTH * (flowStartIndex + 1) + WORKFLOW_STEP_WIDTH,
        y: prefFlowYEnds,
        yEnd: nodeLength * NODE_BUTTON_HEIGHT +  OUTPUT_EDGE_LENGTH * outputsLength,
    };
}

export interface NodePositionData {
    flowStepPosition: Position;
    flowStep: FlowStep;
    nodeId: string;
    prevNodeYEnd: number;
}

export function calculateFlowStepNodePosition(data: NodePositionData): Position {
    const {
        flowStepPosition,
        flowStep,
        nodeId,
        prevNodeYEnd,
    } = data;

    const outputLength = flowStep.outputIdsByNodeId[nodeId].length;

    return {
        x: flowStepPosition.x,
        xEnd: flowStepPosition.x,
        y: prevNodeYEnd + OUTPUT_EDGE_LENGTH,
        yEnd: prevNodeYEnd + OUTPUT_EDGE_LENGTH + OUTPUT_EDGE_LENGTH * outputLength,
    };
}

export interface IOPositionData {
    nodePosition: Position;
    ioIndex: number;
}

export function calculateIOPosition(data: IOPositionData): Position {
    const { x: nodeX, y: nodeY } = data.nodePosition;

    return {
        x: nodeX + EDGE_LENGTH + MARGIN_LEFT,
        xEnd: nodeX + EDGE_LENGTH + MARGIN_LEFT + OUTPUT_BUTTON_WIDTH,
        y: nodeY + OUTPUT_EDGE_LENGTH,
        yEnd: nodeY + OUTPUT_EDGE_LENGTH,
    };
}

export function calculateInitialIoPosition(ioIndex: number) {
    return {
        x: OUTPUT_EDGE_LENGTH + MARGIN_LEFT,
        xEnd: OUTPUT_EDGE_LENGTH + MARGIN_LEFT + OUTPUT_BUTTON_WIDTH,
        y: ioIndex * OUTPUT_EDGE_LENGTH,
        yEnd: ioIndex * OUTPUT_EDGE_LENGTH,
    };
}
