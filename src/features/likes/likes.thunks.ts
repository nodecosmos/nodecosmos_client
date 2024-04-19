import {
    Like, LikePrimaryKey,
    LikesCountResponse, LikeType,
} from './likes.types';
import nodecosmos from '../../api/nodecosmos-server';
import { WithOptCurrentBranchId } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserLikes = createAsyncThunk<
    LikePrimaryKey[],
    void
>(
    'likes/getUserLikes',
    async () => {
        const response = await nodecosmos.get('/likes/user_likes');

        return response.data;
    },
);

export const getLikesCount = createAsyncThunk<
    LikesCountResponse,
    WithOptCurrentBranchId<LikePrimaryKey & {objectType: LikeType}>
>(
    'nodes/getLikesCount',
    async ({ objectId, branchId }: WithOptCurrentBranchId<LikePrimaryKey>): Promise<LikesCountResponse> => {
        const response = await nodecosmos.get(`/likes/${objectId}/${branchId}/objectType`);

        return response.data;
    },
);

export const likeObject = createAsyncThunk<
    LikesCountResponse,
    WithOptCurrentBranchId<Omit<Like, 'createdAt' | 'updatedAt'>>
>(
    'nodes/likeObject',
    async (payload) => {
        const response = await nodecosmos.post('/likes', payload);

        return response.data;
    },
);

export const unlikeObject = createAsyncThunk<
    LikesCountResponse,
    WithOptCurrentBranchId<LikePrimaryKey>
>(
    'nodes/unlikeObject',
    async ({ objectId, branchId }) => {
        const response = await nodecosmos.delete(`/likes/${objectId}/${branchId}`);

        return response.data;
    },
);
