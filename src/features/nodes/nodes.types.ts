import {
    Profile, ProfileType, UUID, BranchId, RootId,
} from '../../types';

export interface NodePrimaryKey {
    branchId: UUID;
    id: UUID;
}

export interface Node extends NodePrimaryKey {
    rootId: UUID;
    parentId: UUID;
    orderIndex: number;
    isPublic: boolean;
    isRoot: boolean;
    title: string;
    ancestorIds: UUID[];
    ownerId?: UUID | null;
    ownerType?: ProfileType | null;
    creatorId?: UUID | null;
    editorIds?: Set<UUID> | null;
    owner?: Profile | null;
    coverImageUrl?: string | null;
    coverImageFilename?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export interface NodeDescendant {
    rootId: UUID;
    branchId: UUID;
    nodeId: UUID;
    orderIndex: number;
    id: UUID;
    parentId: UUID;
    title: string;
}

export interface NodeTreeAttributes {
    treeRootId: UUID;
    isEditing?: boolean;
    isDragOver?: boolean;
    isCreationInProgress?: boolean;
    childIds: UUID[];
}

export interface AppNode extends Node, NodeTreeAttributes {
    persistedId: UUID | null;
    likeCount?: number;
    isTmp: boolean;
    tmpId?: UUID;
    isSelected: boolean;
}

export interface IndexNode {
    id: UUID;
    branchId: UUID;
    rootId: UUID;
    isRoot: boolean;
    isPublic: boolean;
    shortDescription: string | null;
    title: string;
    likeCount: number;
    contributionRequestsCount: number;
    threadsCount: number;
    owner: Profile;
    coverImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface NodeByOwner {
    id: UUID;
    branchId: UUID;
    rootId: UUID;
    title: string;
    isPublic: boolean;
    isRoot: boolean;
}

export type UpdateTitlePayload = Pick<Node, 'title'> & NodePrimaryKey & RootId;
export type TreeNodeKey = BranchId & Omit<NodePrimaryKey, 'branchId'>
export type AppNodePayload = TreeNodeKey & Partial<Omit<AppNode, keyof NodePrimaryKey>>;

export interface DragAndDrop {
    id: UUID;
    branchId: UUID;
    parentId: UUID;
    rootId: UUID;
    siblingIndex: number;
}

export enum TreeDensity {
    Default = 'default',
    Compact = 'compact',
}

export interface NodeState {
    // branchId -> nodeId
    byBranchId: Record<UUID, Record<UUID, AppNode>>;
    childIds: Record<UUID, Record<UUID, UUID[]>>;
    titles: Record<UUID, Record<UUID, string>>;
    selected: NodePrimaryKey | null;
    scrollTo: UUID | null;
    indexNodesById: Record<UUID, IndexNode>;
    saveInProgress: boolean;
    dragAndDrop: DragAndDrop | null;
    justCreatedNodeId: UUID | null;
    expandedNodes: Set<UUID>;
    scale: number;
    treeDensity: TreeDensity;
    showAncestorChain: boolean;
    indexSearchTerm?: string;
    sidebarOpen: boolean;
    byOwnerId: Record<UUID, NodeByOwner[]>;
}

export enum TreeType {
    Default = 'default',
    Checkbox = 'checkbox',
    ContributionRequest = 'contributionRequest',
}
