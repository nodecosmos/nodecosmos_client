import { Profile, UUID } from '../../types';

export enum ConflictStatus {
    Pending,
    Resolved,
}

export interface Conflict {
    status: ConflictStatus;
    deletedAncestors: Set<UUID> | null;
    deletedEditedNodes: Set<UUID> | null;
    deletedEditedFlows: Set<UUID> | null;
    deletedEditedFlowSteps: Set<UUID> | null;
    deletedEditedIos: Set<UUID> | null;
    conflictingFlowSteps: Set<UUID>;
}

export interface BranchParams {
    currentRootId: UUID; // corresponds to the id of the current node
    branchId: UUID; // either id of the current node or id of the contribution request, depending on the context
}

// TextChange is used to store the old and new values of a text field at time of merge
export interface TextChange {
    old: string;
    new: string;
}

export enum BranchStatus {
    Open = 'Open',
    Merged = 'Merged',
    Recovered = 'Recovered',
    RecoveryFailed = 'RecoveryFailed',
    Closed = 'CLOSED',
}

interface BranchReorderData {
    id: UUID;
    newParentId: UUID;
    newOrderIndex: number;
    oldParentId: UUID;
    oldOrderIndex: number;
}

export interface Branch {
    id: UUID;
    title: string;
    description: string;
    status: BranchStatus;
    ownerId: UUID;
    owner: Profile;
    editorIds: Set<UUID>;
    isPublic: boolean;
    isContributionRequest: boolean;
    createdNodes: Set<UUID>;
    restoredNodes: Set<UUID>;
    deletedNodes: Set<UUID>;
    editedTitleNodes: Set<UUID>;
    editedDescriptionNodes: Set<UUID>;
    reorderedNodes: BranchReorderData[];
    editedWorkflowNodes: Set<UUID>;
    createdWorkflowInitialInputs: Record<UUID, UUID[]>;
    deletedWorkflowInitialInputs: Record<UUID, UUID[]>;
    createdFlows: Set<UUID>;
    deletedFlows: Set<UUID>;
    restoredFlows: Set<UUID>;
    editedTitleFlows: Set<UUID>;
    editedDescriptionFlows: Set<UUID>;
    createdFlowSteps: Set<UUID>;
    deletedFlowSteps: Set<UUID>;
    restoredFlowSteps: Set<UUID>;
    keptFlowSteps: Set<UUID>;
    editedDescriptionFlowSteps: Set<UUID>;
    createdFlowStepNodes: Record<UUID, Set<UUID>>;
    deletedFlowStepNodes: Record<UUID, Set<UUID>>;
    createdFlowStepInputsByNode: Record<UUID, Record<UUID, Set<UUID>>>;
    deletedFlowStepInputsByNode: Record<UUID, Record<UUID, Set<UUID>>>;
    createdFlowStepOutputsByNode: Record<UUID, Record<UUID, Set<UUID>>>;
    deletedFlowStepOutputsByNode: Record<UUID, Record<UUID, Set<UUID>>>;
    createdIos: Set<UUID>;
    deletedIos: Set<UUID>;
    restoredIos: Set<UUID>;
    editedTitleIos: Set<UUID>;
    editedDescriptionIos: Set<UUID>;
    conflict: Conflict;
    descriptionChangeByObject: Record<UUID, TextChange>;
    titleChangeByObject: Record<UUID, TextChange>;
}

export interface BranchDiffPayload {
    currentRootId: UUID;
    currentBranchId: UUID;
    objectId: UUID;
}

export interface BranchesState {
    byId: Record<UUID, Branch>;
}
