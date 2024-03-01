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

export interface CommentThreadPrimaryKey {
    objectId: UUID;
    id: UUID;
}

/**
 * **objectId** corresponds to the following:
 *   * **`ContributionRequest['id']`** for ContributionRequest related comments
 *   * **`Topic['id']`**  for Topic related comments
 *
 * **id**  corresponds to following:
 *  - **`Node['id']`**  for node related comments within ContributionRequest
 *  - **`ContributionRequest['id']`**  for main thread of ContributionRequest comments
 */
export interface CommentThread extends CommentThreadPrimaryKey {
    objectType: ObjectType;
    threadType: ThreadType;
    nodeId: UUID; // nodeId of the contribution request or topic but not for the comments related to nodes
    lineNumber?: number; // line number of the description where the thread is created
    lineContent?: string; // line of description where the thread is created
}

export type CommentThreadInsertPayload = Omit<CommentThread, 'objectId' | 'id'>;

export interface CommentPrimaryKey {
    objectId: UUID;
    threadId: UUID;
    id: UUID;
}

export interface Comment extends CommentPrimaryKey {
    content: string;
    threadId: UUID;
    authorId: UUID;
    author: Profile;
    createdAt: Date;
    updatedAt: Date;
}

export type CommentInsertPayload = Omit<Comment, 'objectId' | 'threadId' | 'id'>;

export interface CommentState {
    byObjectId: Record<UUID, Comment[]>;
    idsByThreadId: Record<UUID, UUID[]>;
    threadIdsByLine: Map<string, UUID[]>;
}
