import {
    Like, LikePrimaryKey,
    likeCountResponse,
} from './likes.types';
import nodecosmos from '../../api/nodecosmos-server';
import { UUID } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getLikeCount = createAsyncThunk<
    likeCountResponse,
    {objectId: UUID, branchId: UUID}
>(
    'nodes/getLikeCount',
    async (payload): Promise<likeCountResponse> => {
        const { objectId, branchId } = payload;
        const response = await nodecosmos.get(`/likes/${objectId}/${branchId}`);

        return response.data;
    },
);

export const likeObject = createAsyncThunk<
    likeCountResponse,
    Omit<Like, 'createdAt' | 'updatedAt'>
>(
    'nodes/likeObject',
    async (payload) => {
        const response = await nodecosmos.post('/likes', payload);

        return response.data;
    },
);

export const unlikeObject = createAsyncThunk<
    likeCountResponse,
    LikePrimaryKey
>(
    'nodes/unlikeObject',
    async ({
        objectId, branchId, userId,
    }) => {
        const response = await nodecosmos.delete(`/likes/${objectId}/${branchId}/${userId}`);

        return response.data;
    },
);
