import {
    Like, LikePrimaryKey,
    likeCountResponse, LikeType,
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

export const getLikeCount = createAsyncThunk<
    likeCountResponse,
    WithOptCurrentBranchId<LikePrimaryKey & {objectType: LikeType}>
>(
    'nodes/getLikeCount',
    async (payload): Promise<likeCountResponse> => {
        const {
            objectId, branchId, objectType,
        } = payload;
        const response = await nodecosmos.get(`/likes/${objectId}/${branchId}/${objectType}`);

        return response.data;
    },
);

export const likeObject = createAsyncThunk<
    likeCountResponse,
    WithOptCurrentBranchId<Omit<Like, 'createdAt' | 'updatedAt'>>
>(
    'nodes/likeObject',
    async (payload) => {
        const response = await nodecosmos.post('/likes', payload);

        return response.data;
    },
);

export const unlikeObject = createAsyncThunk<
    likeCountResponse,
    WithOptCurrentBranchId<LikePrimaryKey>
>(
    'nodes/unlikeObject',
    async ({ objectId, branchId }) => {
        const response = await nodecosmos.delete(`/likes/${objectId}/${branchId}`);

        return response.data;
    },
);
