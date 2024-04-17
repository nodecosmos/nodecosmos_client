import { UUID } from '../../types';

export interface LikePrimaryKey {
    objectId: UUID;
    branchId: UUID;
}

export interface Like extends LikePrimaryKey {
    objectType: LikeType;
    createdAt: Date;
    updatedAt: Date;
}

export enum LikeType {
    Node = 'Node',
}

export interface LikesCountResponse {
    id: UUID;
    branchId: UUID;
    likesCount: number;
}

export interface LikeState {
    byBranchId: Record<UUID, Record<UUID, boolean>>;
}
