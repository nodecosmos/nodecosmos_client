import { WorkflowDiagram } from './diagram/diagram.types';
import { UUID, WithOptionalId } from '../../types';
import { FlowStep } from '../flow-steps/types';
import { Flow } from '../flows/types';
import { InputOutput } from '../input-outputs/types';

interface WorkflowPrimaryKey {
    nodeId: UUID;
    branchId: UUID;
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
export type WorkflowUpsertPayload =
    WithOptionalId<WorkflowPrimaryKey> & Partial<Omit<Workflow, keyof WorkflowPrimaryKey>>;

export interface WorkflowData {
    workflow: Workflow,
    flows: Flow[],
    flowSteps: FlowStep[],
    inputOutputs: InputOutput[]
}

export enum WorkflowDiagramObjectType {
    Flow = 'flow',
    FlowStep = 'flowStep',
    Node = 'node',
    IO = 'io',
}

export interface WorkflowDiagramObject {
    id: UUID;
    flowStepId?: UUID; // used for node selection
    type: WorkflowDiagramObjectType;
}

export interface WorkflowState {
    byId: Record<UUID, Workflow>;
    idByNodeId: Record<UUID, UUID>;
    // diagram
    workflowDiagramById: Record<UUID, WorkflowDiagram>;
    selectedWorkflowObject: WorkflowDiagramObject | null;
    workflowScale: number;
}
