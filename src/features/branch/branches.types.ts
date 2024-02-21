import { Profile, UUID } from '../../types';

export enum ConflictStatus {
    Pending,
    Resolved,
}

export interface Conflict {
    status: ConflictStatus;
    deletedAncestors: Set<UUID> | null;
    deletedEditedNodes: Set<UUID> | null;
}

export interface BranchParams {
    mainBranchId: UUID; // corresponds to the id of the current node
    branchId: UUID; // either id of the current node or id of the contribution request, depending on the context
}

// TextChange is used to store the old and new values of a text field at time of merge
export interface TextChange {
    old: string;
    new: string;
}

export enum BranchStatus {
    Open = 'OPEN',
    Merged = 'MERGED',
    Recovered = 'RECOVERED',
    RecoveryFailed = 'RECOVERY_FAILED',
    Closed = 'CLOSED',
}

export interface Branch {
    id: UUID;
    title: string;
    description: string;
    status: BranchStatus;
    ownerId: UUID;
    owner: Profile;
    editorIds?: UUID[];
    isContributionRequest: boolean;
    createdNodes: Set<UUID>;
    restoredNodes: Set<UUID>;
    deletedNodes: Set<UUID>;
    editedNodeTitles: Set<UUID>;
    editedNodeDescriptions: Set<UUID>;
    editedNodeTreePositions: Set<UUID>;
    createdWorkflows: Set<UUID>;
    deletedWorkflows: Set<UUID>;
    editedWorkflowTitles: Set<UUID>;
    createdFlows: Set<UUID>;
    deletedFlows: Set<UUID>;
    editedFlowTitles: Set<UUID>;
    editedFlowDescriptions: Set<UUID>;
    createdIos: Set<UUID>;
    deletedIos: Set<UUID>;
    editedIoTitles: Set<UUID>;
    editedIoDescriptions: Set<UUID>;
    createdFlowSteps: Set<UUID>;
    deletedFlowSteps: Set<UUID>;
    createdFlowStepInputsByNode: Record<UUID, Set<UUID>>;
    deletedFlowStepInputsByNode: Record<UUID, Set<UUID>>;
    titleChangeByObject: Record<UUID, TextChange>;
    descriptionChangeByObject: Record<UUID, TextChange>;
    conflict?: Conflict;
}

export interface BranchesState {
    byId: Record<UUID, Branch>;
}
