import { UUID } from '../../types';

export interface FlowStep {
    // primary key
    nodeId: UUID;
    workflowId: UUID;
    flowId: UUID;
    flowIndex: number;
    id: UUID;
    // other fields
    nodeIds: UUID[];
    description: string;
    descriptionMarkdown: string;
    inputIdsByNodeId: Record<UUID, UUID[]>;
    outputIdsByNodeId: Record<UUID, UUID[]>;
    createdAt: Date;
    updatedAt: Date;
}

export interface FlowStepState {
    byId: Record<UUID, FlowStep>,
}
