import { Comment } from './features/comments/comments.types';
import { Node } from './features/nodes/nodes.types';
import { HttpStatusCode } from 'axios';

export type UUID = string;
export type OptionalId = { id?: UUID };
export type WithOptionalId<T> = Omit<T, 'id'> & OptionalId;

export type NodecosmosError = {
    status?: HttpStatusCode;
    message?: string;
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

export type Exact<T, Shape> = T & {
    [K in Exclude<keyof Shape, keyof T>]?: never;
};

export type Strict<MyType> = MyType & Exact<MyType, MyType>;

export type WithNodeId<T> = T & { nodeId: UUID };
export type WithRootId<T> = T & { rootId: UUID };

export enum ActionTypes {
    CreateNode = 'CREATE_NODE',
    ReadNode = 'READ_NODE',
    UpdateNode = 'UPDATE_NODE',
    DeleteNode = 'DELETE_NODE',
    ReorderNode = 'REORDER_NODE',
    Merge = 'MERGE',
    CreateWorkflow = 'CREATE_WORKFLOW',
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
}

export type EventData = Comment | Node;
