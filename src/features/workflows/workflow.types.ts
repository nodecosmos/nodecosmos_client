import { WorkflowDiagram } from './diagram/diagram.types';
import {
    RootId, UUID, WithOptionalId, 
} from '../../types';
import { FlowStep } from '../flow-steps/flowSteps.types';
import { Flow } from '../flows/flows.types';
import { InputOutput } from '../input-outputs/inputOutputs.types';

export interface WorkflowPrimaryKey {
    nodeId: UUID;
    branchId: UUID;
}

export interface Workflow extends WorkflowPrimaryKey {
    // other fields
    rootId: UUID;
    title: string;
    description: string;
    descriptionMarkdown: string;
    initialInputIds: UUID[];
}

// primary key with optional id + partial of the rest
export type WorkflowUpsertPayload = WithOptionalId<WorkflowPrimaryKey>
    & Partial<Omit<Workflow, keyof WorkflowPrimaryKey>>
    & RootId;

export interface WorkflowData {
    workflow: Workflow,
    flows: Flow[],
    flowSteps: FlowStep[],
    inputOutputs: InputOutput[]
}

export interface WorkflowState {
    // BranchId, NodeId
    byBranchId: Record<UUID, Record<UUID, Workflow>>;
    // diagram
    workflowDiagramByBranchId: Record<UUID, Record<UUID, WorkflowDiagram>>;
    workflowScale: number;
}
