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
    editedNodeTitlesById?: Record<UUID, string>;
    editedNodeDescriptionsById?: Record<UUID, string>;
    editedNodeTreePositionsById?: Record<UUID, string>;
    createdWorkflowsById?: Record<UUID, boolean>;
    deletedWorkflowsById?: Record<UUID, boolean>;
    editedWorkflowTitlesById?: Record<UUID, string>;
    createdFlowsById?: Record<UUID, boolean>;
    deletedFlowsById?: Record<UUID, boolean>;
    editedFlowTitlesById?: Record<UUID, string>;
    editedFlowDescriptionsById?: Record<UUID, string>;
    createdIosById?: Record<UUID, boolean>;
    deletedIosById?: Record<UUID, boolean>;
    editedIoTitlesById?: Record<UUID, string>;
    editedIoDescriptionsById?: Record<UUID, string>;
    createdFlowStepsById?: Record<UUID, boolean>;
    deletedFlowStepsById?: Record<UUID, boolean>;
    createdFlowStepInputsById?: Record<UUID, boolean>;
    deletedFlowStepInputsById?: Record<UUID, boolean>;
}

export interface BranchesState {
    byId: Record<UUID, Branch>;
}
