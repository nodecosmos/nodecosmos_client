import { UUID } from '../../types';

// app defined attributes
interface FlowStepAppAttrs {
    index: number;
}

export interface FlowStepPrimaryKey {
    nodeId: UUID;
    branchId: UUID;
    flowId: UUID;
    flowIndex: number;
    id: UUID;
}

export interface FlowStep extends FlowStepPrimaryKey, FlowStepAppAttrs {
    rootId: UUID;
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
    rootId: UUID;
    nodeIds: UUID[];
}

type FsWithoutPk = Partial<Omit<FlowStep, keyof FlowStepPrimaryKey>>;

export interface FlowStepUpdatePayload extends FlowStepPrimaryKey, FsWithoutPk {
    rootId: UUID;
}

export interface FlowStepState {
    byBranchId: Record<UUID, Record<UUID, FlowStep>>;
}
