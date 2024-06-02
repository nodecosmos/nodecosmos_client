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

export interface BranchMetadata {
    /**
     * @description
     * We delete from state if object is original record or if it's created in the current branch.
     * Otherwise, we keep it in state for diffing purposes.
     */
    deleteFromState?: boolean;
}

export type WithBranchMetadata<T> = {
    data: T,
    metadata: BranchMetadata
};

export interface BranchParams {
    originalId: UUID; // corresponds to the id of the current node
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
    // Recovered = 'Recovered',
    // RecoveryFailed = 'RecoveryFailed',
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
    rootId: UUID;
    nodeId: UUID;
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
    editedNodes: Set<UUID>;
    createdInitialInputs: UUID[];
    deletedInitialInputs: UUID[];
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
    originalId: UUID;
    branchId: UUID;
    objectId: UUID;
}

export interface BranchesState {
    byId: Record<UUID, Branch>;
}
