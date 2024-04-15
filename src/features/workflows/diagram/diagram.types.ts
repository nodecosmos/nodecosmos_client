/**
 * ### Back-end structure
 * - Each `Workflow` has multiple `Flows`.
 * - Each `Flow` represents isolated process within the `Workflow`.
 * - Each `Flow` has multiple `FlowSteps`.
 * - Each `FlowStep` represents a single step within a `Flow`.
 *
 * ### Front-end structure
 * Note that in back-end we don't have `WorkflowSteps` so in front-end we have to build them
 * by understanding that each `WorkflowStep` have corresponding `FlowSteps` that are calculated
 * by `Flow.startIndex` + index of a `FlowStep` within `Flow`.
 *
 * Each Flow starting position, within the `Workflow`, is determined by `flow.startIndex` attribute.
 */

import { Position, UUID } from '../../../types';

export interface Output {
    id: UUID;
    nodeId: UUID | null;
    // used to calculate loop input link
    nodePosition: Position | null;
    position: Position;
}

export interface FlowStepNode {
    id: UUID;
    flowStepId: UUID;
    inputIds: UUID[];
    outputs: Output[];
    position: Position;
}

export interface WorkflowStepFlow {
    id: UUID;
    stepId: UUID | null;
    startIndex: number;
    verticalIndex: number;
    position: Position;
    flowStepNodes: FlowStepNode[];
    outputs: Output[]; // combined outputs from all nodes
    prevFlowIndex: number | null;
    nextFlowIndex: number | null;
}

export interface WorkflowStep {
    index: number;
    flows: WorkflowStepFlow[];
    position: Position;
    outputIds: Set<UUID>;
}

export interface WorkflowDiagram {
    initialInputs: Output[];
    workflowSteps: WorkflowStep[];
    outputsById: Record<UUID, Output>;
    height: number;
}
