import { UUID } from '../../types';

export interface Like {
    id: UUID;
    userId: UUID;
    objectId: UUID;
    objectType: LikeType;
    createdAt: Date;
    updatedAt: Date;
}

export enum LikeType {
    Node = 'node',
}

export interface LikesCountResponse {
    id: UUID;
    likesCount: number;
    likedByCurrentUser: boolean;
}

export interface LikeState {
    likedObjectIds: UUID[];
}
