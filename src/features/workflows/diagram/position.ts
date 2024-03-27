import { Position } from '../../../types';
import { FlowStep } from '../../flow-steps/flowSteps.types';
import {
    EDGE_LENGTH,
    MARGIN_LEFT,
    OUTPUT_EDGE_LENGTH,
    WORKFLOW_STEP_WIDTH,
    WORKFLOW_START_MARGIN_TOP,
    WORKFLOW_STEP_HEIGHT,
    OUTPUT_BUTTON_SKEWED_WIDTH,
} from '../constants';

export function calculateWorkflowStepPosition(index: number): Position {
    return {
        x: WORKFLOW_STEP_WIDTH * (index + 1),
        xEnd: WORKFLOW_STEP_WIDTH * (index + 1) + WORKFLOW_STEP_WIDTH,
        y: 0,
        yEnd: 0,
    };
}

export interface FlowStepPositionData {
    flowStep: FlowStep | null;
    flowStartIndex: number;
    stepIndex: number;
    prefFlowYEnd: number;
}

export function calculateFlowStepPosition(data: FlowStepPositionData): Position {
    const {
        flowStep,
        flowStartIndex,
        stepIndex,
        prefFlowYEnd,
    } = data;

    const nodeLength = (flowStep && flowStep?.nodeIds?.length) || 0;
    const outputsLength = (
        flowStep
            && flowStep.outputIdsByNodeId
            && Object.values(flowStep.outputIdsByNodeId).flat().length
    ) || 0;

    const y = prefFlowYEnd + WORKFLOW_STEP_HEIGHT;
    const yEnd = y + nodeLength * OUTPUT_EDGE_LENGTH + outputsLength * OUTPUT_EDGE_LENGTH;

    return {
        x: WORKFLOW_STEP_WIDTH * (flowStartIndex + stepIndex + 1),
        xEnd: WORKFLOW_STEP_WIDTH * (flowStartIndex + 1) + WORKFLOW_STEP_WIDTH,
        y,
        yEnd,
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
    const outputLength = (outputIdsByNodeId && outputIdsByNodeId[nodeId]?.length) || 0;

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

export interface IoPositionData {
    nodePosition: Position;
    ioIndex: number;
}

export function calculateIoPosition(data: IoPositionData): Position {
    const { ioIndex, nodePosition } = data;
    const { x: nodeX, y: nodeY } = nodePosition;

    const x = nodeX + EDGE_LENGTH + MARGIN_LEFT;
    const y = nodeY + (ioIndex + 1) * OUTPUT_EDGE_LENGTH;

    return {
        x,
        xEnd: x + EDGE_LENGTH + MARGIN_LEFT + OUTPUT_BUTTON_SKEWED_WIDTH - 7,
        y,
        yEnd: y,
    };
}

export function calculateInitialIoPosition(ioIndex: number) {
    const x = OUTPUT_EDGE_LENGTH + MARGIN_LEFT;
    const y = OUTPUT_EDGE_LENGTH + WORKFLOW_START_MARGIN_TOP + (ioIndex + 1) * OUTPUT_EDGE_LENGTH;

    return {
        x,
        xEnd: x + EDGE_LENGTH + MARGIN_LEFT + OUTPUT_BUTTON_SKEWED_WIDTH - 7,
        y,
        yEnd: y,
    };
}
