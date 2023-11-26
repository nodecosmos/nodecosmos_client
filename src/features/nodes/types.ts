import {
    Owner, OwnerType, UUID,
} from '../../types';

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

export interface AppNode extends Node {
    persistentId?: UUID | null;
    isTemp: boolean;
    isSelected: boolean;
    childIds: UUID[];
    descendantIds: UUID[];
    nestedLevel: number;
    treeRootNodeId: UUID;
    likedByCurrentUser?: boolean | null;
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

export interface NodeCreationPayload {
    tmpNodeId?: UUID;
    branchId?: UUID;
    parentId?: UUID;
    title: string;
    isPublic: boolean;
    isRoot: boolean;
    order: number;
}

export type NodePayload = NodePrimaryKey & Partial<Omit<Node, keyof NodePrimaryKey>>;

export enum NodePaneContents {
    Markdown = 'markdown',
    Description = 'description',
    Workflow = 'workflow',
    Editor = 'editor',
}

type BranchId = UUID;
type NodeId = UUID;

export interface NodeState {
    byBranchId: Record<BranchId, Record<NodeId, AppNode>>;
    childIds: Record<BranchId, Record<NodeId, NodeId[]>>;
    titles: Record<BranchId, Record<NodeId, string>>;
    selectedNodePrimaryKey: NodePrimaryKey | null;
    nodePaneContent: NodePaneContents;
    indexNodesById: Record<NodeId, IndexNode>;
    isNodeActionInProgress: boolean;
}
