import {
    Profile, ProfileType, Position, UUID, CurrentBranchId,
} from '../../types';

// for main nodes branch id is equal to branch id
export interface NodePrimaryKey {
    id: UUID;
    branchId: UUID;
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
    editorIds?: UUID[] | null;
    owner?: Profile | null;
    coverImageUrl?: string | null;
    coverImageFilename?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}
export interface NodeDescendant extends NodePrimaryKey {
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
    likesCount?: number;
    isTmp: boolean;
    tmpId?: UUID;
    isSelected: boolean;
}

export interface IndexNode {
    id: UUID;
    branchId: UUID;
    isRoot: boolean;
    isPublic: boolean;
    shortDescription: string | null;
    title: string;
    likesCount: number;
    owner: Profile;
    coverImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IndexNodesPayload {
    q: string;
    page?: number;
}

export type PKWithCurrentBranch = NodePrimaryKey & CurrentBranchId;
export type NodePayload = PKWithCurrentBranch & Partial<Omit<Node, keyof NodePrimaryKey>>;
export type UpdateTitlePayload = PKWithCurrentBranch & Pick<Node, 'title'>;
export type TreeNodeKey = CurrentBranchId & Omit<NodePrimaryKey, 'branchId'>
export type AppNodePayload = TreeNodeKey & Partial<Omit<AppNode, keyof NodePrimaryKey>>;

export enum NodePaneContent {
    Markdown = 'markdown',
    Description = 'description',
    Workflow = 'workflow',
    Editor = 'editor',
}

export type BranchId = UUID;
export type NodeId = UUID;

export interface DragAndDrop {
    id: NodeId;
    currentBranchId: BranchId;
    branchId: BranchId;
    parentId: NodeId;
    siblingIndex: number;
}

export interface NodeState {
    byBranchId: Record<BranchId, Record<NodeId, AppNode>>;
    childIds: Record<BranchId, Record<NodeId, NodeId[]>>;
    positions: Record<BranchId, Record<NodeId, Position>>;
    titles: Record<BranchId, Record<NodeId, string>>;
    selected: PKWithCurrentBranch | null;
    nodePaneContent: NodePaneContent;
    indexNodesById: Record<NodeId, IndexNode>;
    saveInProgress: boolean;
    dragAndDrop: DragAndDrop | null;
    justCreatedNodeId: UUID | null;
}

export enum TreeType {
    Default = 'default',
    Checkbox = 'checkbox',
    ContributionRequest = 'contributionRequest',
}
