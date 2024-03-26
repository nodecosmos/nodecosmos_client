import { UUID } from '../../types';

// app defined attributes
interface FlowStepAppAttrs {
    index: number;
}

export interface FlowStepPrimaryKey {
    nodeId: UUID;
    branchId: UUID;
    workflowId: UUID;
    flowId: UUID;
    flowIndex: number;
    id: UUID;
}

export interface FlowStep extends FlowStepPrimaryKey, FlowStepAppAttrs {
    nodeIds: UUID[];
    description: string;
    descriptionMarkdown: string;
    inputIdsByNodeId: Record<UUID, UUID[]>;
    outputIdsByNodeId: Record<UUID, UUID[]>;
    createdAt: Date;
    updatedAt: Date;
    prevFlowStepId?: UUID;
    nextFlowStepId?: UUID;
}

export interface FlowStepCreationParams extends Omit<FlowStepPrimaryKey, 'flowIndex' | 'id'> {
    prevFlowStepId?: UUID | null;
    nextFlowStepId?: UUID | null;
    nodeIds: UUID[];
}

// primary key with optional id + partial of the rest
export type FlowStepUpdatePayload = FlowStepPrimaryKey & Partial<Omit<FlowStep, keyof FlowStepPrimaryKey>>;

export interface FlowStepState {
    byBranchId: Record<UUID, Record<UUID, FlowStep>>;
}
