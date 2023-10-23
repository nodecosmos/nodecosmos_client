import { UUID, Position } from '../../types';

export interface Workflow {
    // primary key
    nodeId: UUID;
    id: UUID;
    // other fields
    rootNodeId: UUID;
    title: string;
    description: string;
    descriptionMarkdown: string;
    initialInputIds: UUID[];
}

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
    position: Position;
}

export interface FlowStepNode {
    id: UUID;
    flowStepId: UUID;
    inputs: Output[];
    outputs: Output[];
    position: Position;
}

export interface WfFlowStep {
    id: UUID;
    flowId: UUID;
    startIndex: number;
    position: Position;
    flowStepNodes: FlowStepNode[];
}

export interface WorkflowStep {
    index: number;
    position: Position;
    flowSteps: WfFlowStep[];
    outputs: Output[];
}

export interface WorkflowDiagram {
    initialOutputs: Output[];
    workflowSteps: WorkflowStep[];
}

export interface WorkflowState {
    byId: Record<UUID, Workflow>;
    idByNodeId: Record<UUID, UUID>;
    // diagram
    workflowDiagramById: Record<UUID, WorkflowDiagram>;
    selectedWorkflowObjectId: UUID | null;
    workflowScale: number;
    // pane
    isWfPaneOpen: boolean;
}
