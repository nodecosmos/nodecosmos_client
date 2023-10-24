import {
    UUID, Position, OptionalId,
} from '../../types';

interface WorkflowPrimaryKey {
    nodeId: UUID;
    id: UUID;
}

export interface Workflow extends WorkflowPrimaryKey {
    // other fields
    rootNodeId: UUID;
    title: string;
    description: string;
    descriptionMarkdown: string;
    initialInputIds: UUID[];
}

// primary key with optional id + partial of the rest
export type WorkflowUpsertPayload = OptionalId<WorkflowPrimaryKey> & Partial<Omit<Workflow, keyof WorkflowPrimaryKey>>;

/**
 * ### Workflow back-end structure
 * - Each `Workflow` has multiple `Flows`.
 * - Each `Flow` represents isolated process within the `Workflow`.
 * - Each `Flow` has multiple `FlowSteps`.
 * - Each `FlowStep` represents a single step within a `Flow`.
 *
 * ### Front-end structure
 * Note that in back-end we don't have `WorkflowSteps` so in front-end we have to build them
 * by understanding that each `WorkflowStep` have corresponding `FlowSteps` that are calculated
 * by `Flow.startIndex` and position of `FlowStep` within `Flow`.
 *
 * Each Flow starting position, within the `Workflow`, is determined by `flow.startIndex` attribute.
 */

export interface Output {
    id: UUID;
    nodeId: UUID | null;
    position: Position;
}

export interface FlowStepNode {
    id: UUID;
    flowStepId: UUID;
    inputs: Output[];
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
}

export interface WorkflowStep {
    index: number;
    flows: WorkflowStepFlow[];
    outputs: Output[];
    position: Position;
}

export interface WorkflowDiagram {
    initialInputs: Output[];
    workflowSteps: WorkflowStep[];
}

export interface WorkflowDiagramObject {
    id: UUID;
    type: 'flow' | 'flowStep' | 'node' | 'io';
}

export interface WorkflowState {
    byId: Record<UUID, Workflow>;
    idByNodeId: Record<UUID, UUID>;
    // diagram
    workflowDiagramById: Record<UUID, WorkflowDiagram>;
    selectedWorkflowObject: WorkflowDiagramObject | null;
    workflowScale: number;
    // pane
    isWfPaneOpen: boolean;
}
