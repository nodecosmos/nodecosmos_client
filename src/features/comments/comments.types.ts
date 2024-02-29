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

export interface CommentPrimaryKey {
    objectId: UUID;
    threadId: UUID;
    id: UUID;
}

/**
 * **objectId** corresponds to the following:
 *   * **`ContributionRequest['id']`** for ContributionRequest related comments
 *   * **`Topic['id']`**  for Topic related comments
 *
 * **threadId**  corresponds to following:
 *  - **`Node['id']`**  for node related comments within ContributionRequest
 *  - **`ContributionRequest['id']`**  for main thread of ContributionRequest comments
 */
export interface Comment extends CommentPrimaryKey {
    objectType: ObjectType;
    threadType: ThreadType;
    // nodeId of the contribution request or topic but not for the comments related to nodes
    nodeId: UUID;
    lineNumber: number;
    content: string;
    authorId: UUID;
    author: Profile;
    createdAt: Date;
    updatedAt: Date;
}

export interface CommentState {
    byObjectId: Record<UUID, Comment[]>;
    idsByThreadId: Record<UUID, UUID[]>;
}
