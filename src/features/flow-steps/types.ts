import { OptionalId, UUID } from '../../types';

export interface FlowStepPrimaryKey {
    nodeId: UUID;
    workflowId: UUID;
    flowId: UUID;
    flowIndex: number;
    id: UUID;
}

export interface FlowStep extends FlowStepPrimaryKey {
    nodeIds: UUID[];
    description: string;
    descriptionMarkdown: string;
    inputIdsByNodeId: Record<UUID, UUID[]>;
    outputIdsByNodeId: Record<UUID, UUID[]>;
    createdAt: Date;
    updatedAt: Date;
}

// primary key with optional id + partial of the rest
export type FlowStepUpdatePayload = FlowStepPrimaryKey & Partial<Omit<FlowStep, keyof FlowStepPrimaryKey>>;

export interface FlowStepsByFlowId {
    [flowId: string]: FlowStep[];
}

export interface FlowStepsById {
    [id: string]: FlowStep;
}

export interface FlowStepState {
    byId: FlowStepsById,
}
