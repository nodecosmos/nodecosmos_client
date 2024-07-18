import { UUID } from '../../types';

export interface LikePrimaryKey {
    objectId: UUID;
    branchId: UUID;
    userId: UUID;
}

export interface Like extends LikePrimaryKey {
    rootId?: UUID;
    objectType: LikeType;
    createdAt: Date;
    updatedAt: Date;
}

export enum LikeType {
    Node = 'Node',
}

export interface likeCountResponse {
    id: UUID;
    branchId: UUID;
    likeCount: number;
}

export interface LikeState {
    // branchId, objectId, liked
    currentUserLikes: Record<UUID, Record<UUID, boolean>>;
}
