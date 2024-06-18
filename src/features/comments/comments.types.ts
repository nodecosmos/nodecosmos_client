import { Profile, UUID } from '../../types';

export enum ThreadObjectType {
    ContributionRequest = 'ContributionRequest',
    Thread = 'Thread',
}

export enum ThreadLocation {
    Thread = 'Thread',
    ContributionRequestMainThread = 'ContributionRequest::MainThread',
    ContributionRequestObjectDescription = 'ContributionRequest::ObjectDescription',
    ContributionRequestNode = 'ContributionRequest::Node',
    ContributionRequestFlow = 'ContributionRequest::Flow',
    ContributionRequestFlowStep = 'ContributionRequest::FlowStep',
    ContributionRequestInputOutput = 'ContributionRequest::InputOutput',
}

export const THREAD_TYPE_DESCRIPTION = {
    [ThreadLocation.Thread]: 'commented on thread:',
    [ThreadLocation.ContributionRequestMainThread]: 'commented on main thread:',
    [ThreadLocation.ContributionRequestObjectDescription]: 'commented line:',
    [ThreadLocation.ContributionRequestNode]: 'commented on node:',
    [ThreadLocation.ContributionRequestFlow]: 'commented on flow:',
    [ThreadLocation.ContributionRequestFlowStep]: 'commented on flow step:',
    [ThreadLocation.ContributionRequestInputOutput]: 'commented on input/output:',
};

/**
 * **objectId** corresponds to the following:
 *   * **`ContributionRequest['id']`** for ContributionRequest related comments
 *   * ** `Node['id']`** for Node thread comments
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
    branchId: UUID;
    objectId: UUID;
    id: UUID;
}

export interface CommentThread extends CommentThreadPrimaryKey {
    title: string;
    objectType: ThreadObjectType;
    threadLocation: ThreadLocation;
    lineNumber?: number; // line number of the description where the thread is created
    lineContent?: string; // line of description where the thread is created
    authorId: UUID;
    author: Profile;
    createdAt: string;
    updatedAt: string;
}

export type ThreadInsertPayload =
    Omit<CommentThread, 'id' | 'authorId' | 'author' | 'createdAt' | 'updatedAt'>;

export interface CommentPrimaryKey {
    branchId: UUID;
    objectId: UUID;
    threadId: UUID;
    id: UUID;
}

export interface Comment extends CommentPrimaryKey {
    url: string;
    content: string;
    authorId: UUID;
    author: Profile;
    createdAt: string;
    updatedAt: string;
}

type CommentContent = Pick<Comment, 'content' | 'url'>;
export type WithoutThreadInsertPayload = Pick<Comment, 'content' | 'branchId' | 'objectId' | 'threadId' | 'url'>
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

type BranchId = UUID;
type ObjectId = UUID; // equals to branchId for ContributionRequest
type ThreadId = UUID;
type LineContent = string;
type LineNumber = number;

export interface CommentState {
    byId: Record<UUID, Comment>;
    idsByThreadId: Record<UUID, UUID[]>;
    threadsById: Record<UUID, CommentThread>;
    threadIdsByBranchId: Record<UUID, UUID[]>;
    objectDescriptionThreadsByLine: Record<BranchId, Record<ObjectId, Map<LineContent, [ThreadId, LineNumber]>>>;
    mainObjectThread: Record<BranchId, Record<ObjectId, ThreadId>>;
    threadIdsByBranchIdAndObjectId: Record<BranchId, Record<ObjectId, UUID[]>>;
}
