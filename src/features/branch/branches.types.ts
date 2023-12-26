import { Owner, UUID } from '../../types';

export interface Branch {
    id: UUID;
    title: string;
    description: string;
    ownerId: UUID;
    owner: Owner;
    editorIds?: UUID[];
    isContributionRequest: boolean;
    createdNodes?: Set<UUID>;
    deletedNodes?: Set<UUID>;
    editedNodeTitles?: Set<UUID>;
    editedNodeDescriptions?: Set<UUID>;
    editedNodeTreePositions?: Set<UUID>;
    createdWorkflows?: Set<UUID>;
    deletedWorkflows?: Set<UUID>;
    editedWorkflowTitles?: Set<UUID>;
    createdFlows?: Set<UUID>;
    deletedFlows?: Set<UUID>;
    editedFlowTitles?: Set<UUID>;
    editedFlowDescriptions?: Set<UUID>;
    createdIos?: Set<UUID>;
    deletedIos?: Set<UUID>;
    editedIoTitles?: Set<UUID>;
    editedIoDescriptions?: Set<UUID>;
    createdFlowSteps?: Set<UUID>;
    deletedFlowSteps?: Set<UUID>;
    createdFlowStepInputsByNode?: Record<UUID, Set<UUID>>;
    deletedFlowStepInputsByNode?: Record<UUID, Set<UUID>>;
}

export interface BranchesState {
    byId: Record<UUID, Branch>;
}
