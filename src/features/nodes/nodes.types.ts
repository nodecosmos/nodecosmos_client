import {
    Owner, OwnerType, Position, UUID,
} from '../../types';

// for main nodes branch id is equal to branch id
export interface NodePrimaryKey {
    id: UUID;
    branchId: UUID;
}

export interface Node extends NodePrimaryKey {
    rootId: UUID;
    parentId: UUID;
    order: number;
    isPublic: boolean;
    isRoot: boolean;
    title: string;
    ancestorIds: UUID[];
    description: string | null;
    shortDescription: string | null;
    descriptionMarkdown: string | null;
    descriptionBase64: string | null;
    ownerId?: UUID | null;
    ownerType?: OwnerType | null;
    creatorId?: UUID | null;
    editorIds?: UUID[] | null;
    owner?: Owner | null;
    likesCount?: number;
    coverImageURL?: string | null;
    coverImageKey?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}
export interface NodeDescendant extends NodePrimaryKey {
    rootId: UUID;
    branchId: UUID;
    nodeId: UUID;
    order: number;
    id: UUID;
    parentId: UUID;
    title: string;
}

export interface NodeTreeAttributes {
    treeRootId: UUID;
    isEditing?: boolean;
    isDragOver?: boolean;
    isJustCreated?: boolean;
    isCreationInProgress?: boolean;
    childIds: UUID[];
}

export interface AppNode extends Node, NodeTreeAttributes {
    persistedId: UUID | null;
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
    owner: Owner;
    coverImageURL: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IndexNodesPayload {
    q: string;
    page?: number;
}

export interface TreeBranch {
    treeBranchId: UUID;
}

export type PKWithTreeBranch = NodePrimaryKey & TreeBranch;
export type NodePayload = PKWithTreeBranch & Partial<Omit<Node, keyof NodePrimaryKey>>;

export type UpdateTitlePayload = PKWithTreeBranch & Pick<Node, 'title'>;
export type UpdateDescriptionPayload = PKWithTreeBranch
    & Pick<Node, 'description' | 'descriptionMarkdown' | 'descriptionBase64' | 'shortDescription'>;

export type TreeNodeKey = TreeBranch & Omit<NodePrimaryKey, 'branchId'>
export type AppNodePayload = TreeNodeKey & Partial<Omit<AppNode, keyof NodePrimaryKey>>;

export type WithOptTreeBranchId<T> = T & { treeBranchId?: UUID; };

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
    treeBranchId: BranchId;
    branchId: BranchId;
    parentId: NodeId;
    siblingIndex: number;
}

export interface NodeState {
    byBranchId: Record<BranchId, Record<NodeId, AppNode>>;
    childIds: Record<BranchId, Record<NodeId, NodeId[]>>;
    positions: Record<BranchId, Record<NodeId, Position>>;
    titles: Record<BranchId, Record<NodeId, string>>;
    selected: PKWithTreeBranch | null;
    nodePaneContent: NodePaneContent;
    indexNodesById: Record<NodeId, IndexNode>;
    actionInProgress: boolean;
    dragAndDrop: DragAndDrop | null;
    justCreatedNodeId: UUID | null;
}

export enum TreeType {
    Default = 'default',
    Checkbox = 'checkbox',
    ContributionRequest = 'contributionRequest',
}
