import {
    LikeCreate, LikePrimaryKey,
    LikesCountResponse,
} from './likes.types';
import nodecosmos from '../../api/nodecosmos-server';
import { WithOptTreeBranchId } from '../nodes/nodes.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserLikes = createAsyncThunk(
    'likes/getUserLikes',
    async (): Promise<LikePrimaryKey[]> => {
        const response = await nodecosmos.get('/likes/user_likes');

        return response.data;
    },
);

export const getLikesCount = createAsyncThunk(
    'nodes/getLikesCount',
    async ({ objectId, branchId }: WithOptTreeBranchId<LikePrimaryKey>): Promise<LikesCountResponse> => {
        const response = await nodecosmos.get(`/likes/${objectId}/${branchId}`);

        return response.data;
    },
);

export const likeObject = createAsyncThunk(
    'nodes/likeObject',
    async (params: LikeCreate): Promise<LikesCountResponse> => {
        const response = await nodecosmos.post('/likes', params);

        return response.data;
    },
);

export const unlikeObject = createAsyncThunk(
    'nodes/unlikeObject',
    async ({ objectId, branchId }: WithOptTreeBranchId<LikePrimaryKey>): Promise<LikesCountResponse> => {
        const response = await nodecosmos.delete(`/likes/${objectId}/${branchId}`);

        return response.data;
    },
);
