import { Profile, UUID } from '../../types';

export enum ObjectType {
    ContributionRequest = 'ContributionRequest',
    Topic = 'Topic',
}

export enum ThreadType {
    Topic = 'Topic',
    ContributionRequestMainThread = 'ContributionRequest::MainThread',
    ContributionRequestNodeAddition = 'ContributionRequest::NodeAddition',
    ContributionRequestNodeRemoval = 'ContributionRequest::NodeRemoval',
    ContributionRequestNodeDescription = 'ContributionRequest::NodeDescription',
}

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
    objectType: ObjectType;
    objectNodeId: UUID; // nodeId of the contribution request or topic
    threadType: ThreadType;
    threadNodeId?: UUID;
    lineNumber?: number; // line number of the description where the thread is created
    lineContent?: string; // line of description where the thread is created
}

export type CommentThreadInsertPayload = Omit<CommentThread, keyof CommentThreadPrimaryKey>;

export interface CommentPrimaryKey {
    objectId: UUID;
    threadId: UUID;
    id: UUID;
}

export interface Comment extends CommentPrimaryKey {
    threadId: UUID;
    content: string;
    authorId: UUID;
    author: Profile;
    createdAt: Date;
    updatedAt: Date;
}

export type RawCommentInsertPayload = Pick<Comment, 'content'>
export type ExistingThreadInsertCommentPayload = Pick<Comment, keyof CommentPrimaryKey | 'content'>

export type UpdateCommentPayload = Pick<Comment, keyof CommentPrimaryKey | 'content'>

interface WithThreadCommentInsertPayload {
    thread: CommentThreadInsertPayload;
    comment: RawCommentInsertPayload;
}

interface WithoutThreadCommentInsertPayload {
    thread?: never;
    comment: ExistingThreadInsertCommentPayload;
}

export type CreateCommentPayload = WithThreadCommentInsertPayload | WithoutThreadCommentInsertPayload;

type NodeId = UUID;
type ObjectId = UUID;
type LineContent = string;

export interface CommentState {
    byId: Record<UUID, Comment>;
    idsByObjectId: Record<UUID, UUID[]>;
    idsByThreadId: Record<UUID, UUID[]>;
    threadsById: Record<UUID, CommentThread>;
    threadIdsByObjectId: Record<UUID, UUID[]>;
    threadIdByLine: Record<ObjectId, Record<NodeId, Map<LineContent, UUID>>>;
}
