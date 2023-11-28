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
    description?: string | null;
    shortDescription?: string | null;
    descriptionMarkdown?: string | null;
    descriptionBase64?: string | null;
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

export interface NodeTreeAttributes extends Position {
    treeRootId: UUID;
    upperSiblingId?: UUID | null;
    lowerSiblingId?: UUID | null;
    lastChildId?: UUID;
    childIds: UUID[];
    descendantIds: UUID[];
    nestedLevel: number;
    treeIndex?: number;
    siblingIndex?: number;
    isMounted?: boolean;
    isExpanded?: boolean;
    isEditing?: boolean;
    isCreationInProgress?: boolean;
}

export interface AppNode extends Node, NodeTreeAttributes {
    persistedId: UUID | null;
    isTemp: boolean;
    isSelected: boolean;
    likedByCurrentUser?: boolean | null;
    isDragOver?: boolean;
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

export type NodePayload = NodePrimaryKey & TreeBranch & Partial<Omit<Node, keyof NodePrimaryKey>>;
export type AppNodePayload = NodePrimaryKey & TreeBranch & Partial<Omit<AppNode, keyof NodePrimaryKey>>;

export interface ReorderPayload {
    id: UUID;
    branchId: UUID;
    newParentId: UUID;
    newUpperSiblingId: UUID;
    newBottomSiblingId: UUID;
    newSiblingIndexAfterMove: number;
}

export interface SearchNodePayload {
    rootId: UUID;
    branchId: UUID;
    value: string;
}

export enum NodePaneContent {
    Markdown = 'markdown',
    Description = 'description',
    Workflow = 'workflow',
    Editor = 'editor',
}

type BranchId = UUID;
type NodeId = UUID;

export interface DragAndDrop {
    isDragging: boolean;
    id: NodeId;
    branchId: BranchId;
    parentId: NodeId;
    siblingIndex: number;
}

export type SelectedNode = NodePrimaryKey & TreeBranch;

export interface NodeState {
    byBranchId: Record<BranchId, Record<NodeId, AppNode>>;
    childIds: Record<BranchId, Record<NodeId, NodeId[]>>;
    orderedTreeIds: Record<BranchId, NodeId[]>;
    titles: Record<BranchId, Record<NodeId, string>>;
    selected: SelectedNode | null;
    nodePaneContent: NodePaneContent;
    indexNodesById: Record<NodeId, IndexNode>;
    actionInProgress: boolean;
    dragAndDrop: DragAndDrop | null;
    currentTmpNode: UUID | null;
}

export enum TreeType {
    Default = 'default',
    Checkbox = 'checkbox',
    ContributionRequest = 'contributionRequest',
}
