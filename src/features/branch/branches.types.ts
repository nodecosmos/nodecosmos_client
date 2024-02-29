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
    Open = 'Open',
    Merged = 'Merged',
    Recovered = 'Recovered',
    RecoveryFailed = 'RecoveryFailed',
    Closed = 'CLOSED',
}

/**
 * #[derive(Serialize, Deserialize, Default, PartialEq)]
 * #[charybdis_udt_model(type_name = BranchReorderData)]
 * pub struct BranchReorderData {
 *     pub id: Uuid,
 *     #[serde(rename = "newParentId")]
 *     pub new_parent_id: Uuid,
 *
 *     #[serde(rename = "newOrderIndex")]
 *     pub new_upper_sibling_id: Option<Uuid>,
 *
 *     #[serde(rename = "newLowerSiblingId")]
 *     pub new_lower_sibling_id: Option<Uuid>,
 *
 *     #[serde(rename = "oldParentId")]
 *     pub old_parent_id: Uuid,
 *
 *     #[serde(rename = "oldOrderIndex")]
 *     pub old_order_index: Double,
 * }
 */

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
    editorIds?: UUID[];
    isContributionRequest: boolean;
    createdNodes: Set<UUID>;
    restoredNodes: Set<UUID>;
    deletedNodes: Set<UUID>;
    editedNodeTitles: Set<UUID>;
    editedNodeDescriptions: Set<UUID>;
    reorderedNodes: BranchReorderData[];
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
