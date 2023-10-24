import { Position } from '../../types';
import {
    EDGE_LENGTH, MARGIN_LEFT,
    NODE_BUTTON_HEIGHT,
    OUTPUT_EDGE_LENGTH,
    OUTPUT_BUTTON_WIDTH,
    WORKFLOW_STEP_WIDTH, WORKFLOW_START_MARGIN_TOP, WORKFLOW_STEP_HEIGHT,
} from '../../features/workflows/workflows.constants';
import { FlowStep } from '../../features/flow-steps/types';

export function calculateWorkflowStepPosition(index: number, lastFlowYEnds: number): Position {
    return {
        x: WORKFLOW_STEP_WIDTH * (index + 1),
        xEnd: WORKFLOW_STEP_WIDTH * (index + 1) + WORKFLOW_STEP_WIDTH,
        y: lastFlowYEnds,
        yEnd: lastFlowYEnds,
    };
}

export interface FlowStepPositionData {
    flowStep: FlowStep | null;
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

    const nodeLength = flowStep && flowStep.nodeIds.length || 0;
    const outputsLength = flowStep && flowStep.outputIdsByNodeId &&
        Object.values(flowStep.outputIdsByNodeId).flat().length || 0;

    return {
        x: WORKFLOW_STEP_WIDTH * (flowStartIndex + stepIndex + 1),
        xEnd: WORKFLOW_STEP_WIDTH * (flowStartIndex + 1) + WORKFLOW_STEP_WIDTH,
        y: prefFlowYEnds + WORKFLOW_STEP_HEIGHT,
        yEnd: nodeLength * NODE_BUTTON_HEIGHT + OUTPUT_EDGE_LENGTH * outputsLength,
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

    const outputIdsByNodeId = flowStep?.outputIdsByNodeId;
    const outputLength = outputIdsByNodeId && outputIdsByNodeId[nodeId]?.length || 0;

    let y;
    if (prevNodeYEnd) {
        y = prevNodeYEnd + OUTPUT_EDGE_LENGTH;
    } else {
        y = flowStepPosition.y + OUTPUT_EDGE_LENGTH + WORKFLOW_START_MARGIN_TOP;
    }

    return {
        x: flowStepPosition.x,
        xEnd: flowStepPosition.x + OUTPUT_EDGE_LENGTH,
        y,
        yEnd: y + OUTPUT_EDGE_LENGTH * outputLength,
    };
}

export interface IOPositionData {
    nodePosition: Position;
    ioIndex: number;
}

export function calculateIOPosition(data: IOPositionData): Position {
    const { ioIndex, nodePosition } = data;
    const { x: nodeX, y: nodeY } = nodePosition;

    const y = nodeY + OUTPUT_EDGE_LENGTH + (ioIndex + 1) * OUTPUT_EDGE_LENGTH;

    return {
        x: nodeX + EDGE_LENGTH + MARGIN_LEFT,
        xEnd: nodeX + EDGE_LENGTH + MARGIN_LEFT + OUTPUT_BUTTON_WIDTH,
        y,
        yEnd: y,
    };
}

export function calculateInitialIoPosition(ioIndex: number) {
    const x = OUTPUT_EDGE_LENGTH + MARGIN_LEFT;
    const y = OUTPUT_EDGE_LENGTH + WORKFLOW_START_MARGIN_TOP + (ioIndex + 1) * OUTPUT_EDGE_LENGTH;

    return {
        x,
        xEnd: x + OUTPUT_BUTTON_WIDTH,
        y,
        yEnd: y,
    };
}
