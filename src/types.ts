import { Comment } from './features/comments/comments.types';
import { Node } from './features/nodes/nodes.types';

export type UUID = string;
export type OptionalId = { id?: UUID };
export type WithOptionalId<T> = Omit<T, 'id'> & OptionalId;

export enum HttpErrorCodes {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    PreconditionFailed = 412,
    ResourceLocked = 423,
    InternalServerError = 500,
}

export type NodecosmosError = {
    status: HttpErrorCodes;
    message?: string;
    viewMessage?: boolean;
};

export interface Position {
    x: number;
    y: number;
    xEnd: number;
    yEnd: number;
}

export interface Profile {
    id: UUID;
    profileType: string;
    name: string;
    username: string | null;
    profileImageUrl: string | null;
}

export enum ProfileType {
    User = 'User',
    Organization = 'Organization',
}

export enum ObjectType {
    Node = 'Node',
    Workflow = 'Workflow',
    Flow = 'Flow',
    FlowStep = 'FlowStep',
    Io = 'Io',
}

export const OBJECT_TYPE_NAMES = {
    Node: 'Node',
    Workflow: 'Workflow',
    Flow: 'Flow',
    FlowStep: 'Flow Step',
    Io: 'Input/Output',
};

export type Exact<T, Shape> = T & {
    [K in Exclude<keyof Shape, keyof T>]?: never;
};

export type Strict<MyType> = MyType & Exact<MyType, MyType>;

// branchId refers to current tree
export interface BranchId {
    branchId: UUID;
}

export interface RootId {
    rootId: UUID;
}

export interface NodeId {
    nodeId: UUID;
}

export enum ActionTypes {
    CreateNode = 'CREATE_NODE',
    ReadNode = 'READ_NODE',
    UpdateNode = 'UPDATE_NODE',
    DeleteNode = 'DELETE_NODE',
    ReorderNode = 'REORDER_NODE',
    Merge = 'MERGE',
    ReadWorkflow = 'READ_WORKFLOW',
    UpdateWorkflow = 'UPDATE_WORKFLOW',
    DeleteWorkflow = 'DELETE_WORKFLOW',
    CreateFlow = 'CREATE_FLOW',
    ReadFlow = 'READ_FLOW',
    UpdateFlow = 'UPDATE_FLOW',
    DeleteFlow = 'DELETE_FLOW',
    ReorderFlow = 'REORDER_FLOW',
    CreateFlowStep = 'CREATE_FLOW_STEP',
    ReadFlowStep = 'READ_FLOW_STEP',
    UpdateFlowStep = 'UPDATE_FLOW_STEP',
    DeleteFlowStep = 'DELETE_FLOW_STEP',
    CreateIo = 'CREATE_INPUT_OUTPUT',
    ReadIo = 'READ_INPUT_OUTPUT',
    UpdateIo = 'UPDATE_INPUT_OUTPUT',
    DeleteIo = 'DELETE_INPUT_OUTPUT',
    CreateComment = 'CREATE_COMMENT',
    ReadComment = 'READ_COMMENT',
    UpdateComment = 'UPDATE_COMMENT',
    DeleteComment = 'DELETE_COMMENT',
    CloseSSE = 'CLOSE_SSE',
}

export type EventData = Comment | Node;
