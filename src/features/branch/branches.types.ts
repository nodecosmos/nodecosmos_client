import { Owner, UUID } from '../../types';

export interface Branch {
    id: UUID;
    title: string;
    description: string;
    ownerId: UUID;
    owner: Owner;
    editorIds?: UUID[];
    isContributionRequest: boolean;
    createdNodesById?: Record<UUID, boolean>;
    deletedNodesById?: Record<UUID, boolean>;
    editedNodeTitlesById?: Record<UUID, boolean>;
    editedNodeDescriptionsById?: Record<UUID, boolean>;
    editedNodeTreePositionsById?: Record<UUID, boolean>;
    createdWorkflowsById?: Record<UUID, boolean>;
    deletedWorkflowsById?: Record<UUID, boolean>;
    editedWorkflowTitlesById?: Record<UUID, boolean>;
    createdFlowsById?: Record<UUID, boolean>;
    deletedFlowsById?: Record<UUID, boolean>;
    editedFlowTitlesById?: Record<UUID, boolean>;
    editedFlowDescriptionsById?: Record<UUID, boolean>;
    createdIosById?: Record<UUID, boolean>;
    deletedIosById?: Record<UUID, boolean>;
    editedIoTitlesById?: Record<UUID, boolean>;
    editedIoDescriptionsById?: Record<UUID, boolean>;
    createdFlowStepsById?: Record<UUID, boolean>;
    deletedFlowStepsById?: Record<UUID, boolean>;
    createdFlowStepInputsById?: Record<UUID, boolean>;
    deletedFlowStepInputsById?: Record<UUID, boolean>;
}

export interface BranchesState {
    byId: Record<UUID, Branch>;
}
