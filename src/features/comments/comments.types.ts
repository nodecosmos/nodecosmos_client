import {
    OptionalId, Profile, UUID,
} from '../../types';

export enum CommentObjectType {
    ContributionRequest = 'ContributionRequest',
    Topic = 'Topic',
}

export enum ThreadType {
    Topic = 'Topic',
    ContributionRequestMainThread = 'ContributionRequest::MainThread',
    ContributionRequestObjectDescription = 'ContributionRequest::NodeDescription',
    ContributionRequestNode = 'ContributionRequest::Node',
    ContributionRequestFlow = 'ContributionRequest::Flow',
    ContributionRequestFlowStep = 'ContributionRequest::FlowStep',
    ContributionRequestInputOutput = 'ContributionRequest::InputOutput',
}

export const THREAD_TYPE_DESCRIPTION = {
    [ThreadType.Topic]: 'commented on topic:',
    [ThreadType.ContributionRequestMainThread]: 'commented on main thread:',
    [ThreadType.ContributionRequestObjectDescription]: 'commented line:',
    [ThreadType.ContributionRequestNode]: 'commented on node:',
    [ThreadType.ContributionRequestFlow]: 'commented on flow:',
    [ThreadType.ContributionRequestFlowStep]: 'commented on flow step:',
    [ThreadType.ContributionRequestInputOutput]: 'commented on input/output:',
};

/**
 * **objectId** corresponds to the following:
 *   * **`ContributionRequest['id']`** for ContributionRequest related comments
 *   * **`Topic['id']`**  for Topic related comments
 *
 * **objectNodeId** corresponds to nodeId of the `ContributionRequest` or `Topic`
 *
 * **nodeId** corresponds to the following:
 * ContributionRequest::NodeAddition,
 * ContributionRequest::NodeRemoval,
 * ContributionRequest::NodeDescription
 *
 */
export interface CommentThreadPrimaryKey {
    objectId: UUID;
    id: UUID;
}

export interface CommentThread extends CommentThreadPrimaryKey {
    title: string;
    objectType: CommentObjectType;
    objectNodeId: UUID; // nodeId of the contribution request or topic
    threadType: ThreadType;
    threadObjectId?: UUID;
    lineNumber?: number; // line number of the description where the thread is created
    lineContent?: string; // line of description where the thread is created
    authorId: UUID;
    author: Profile;
    createdAt: string;
    updatedAt: string;
}

export type ThreadInsertPayload =
    Omit<CommentThread, 'id' | 'authorId' | 'author' | 'createdAt' | 'updatedAt'> & OptionalId;

export interface CommentPrimaryKey {
    objectId: UUID;
    threadId: UUID;
    id: UUID;
}

export interface Comment extends CommentPrimaryKey {
    threadId: UUID;
    url: string;
    content: string;
    authorId: UUID;
    author: Profile;
    createdAt: string;
    updatedAt: string;
}

type CommentContent = Pick<Comment, 'content' | 'url'>;
export type WithoutThreadInsertPayload = Pick<Comment, 'content' | 'objectId' | 'threadId' | 'url'>
export type UpdateCommentPayload = Pick<Comment, keyof CommentPrimaryKey | 'content'>
export type UpdateCommentContentResponse = Pick<Comment, 'id' | 'content' | 'updatedAt'>

interface WithThreadCommentInsertPayload {
    newThread?: ThreadInsertPayload;
    comment: CommentContent;
}

interface WithoutThreadCommentInsertPayload {
    newThread?: never;
    comment: WithoutThreadInsertPayload;
}

export type CreateCommentPayload = WithThreadCommentInsertPayload | WithoutThreadCommentInsertPayload;

type ThreadObjectId = UUID; // equals to objectId of thread e.g. node, flow, io, etc..
type ObjectId = UUID; // equals to branchId for ContributionRequest
type ThreadId = UUID;
type LineContent = string;
type LineNumber = number;

export interface CommentState {
    byId: Record<UUID, Comment>;
    idsByThreadId: Record<UUID, UUID[]>;
    threadsById: Record<UUID, CommentThread>;
    threadIdsByObjectId: Record<UUID, UUID[]>;
    objectDescriptionThreadsByLine: Record<ObjectId, Record<ThreadObjectId, Map<LineContent, [ThreadId, LineNumber]>>>;
    mainObjectThread: Record<ObjectId, Record<ThreadObjectId, ThreadId>>;
}
