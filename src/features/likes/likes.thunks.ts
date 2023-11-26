import { LikesCountResponse, LikeType } from './types';
import nodecosmos from '../../apis/nodecosmos-server';
import { UUID } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getLikedObjectIds = createAsyncThunk(
    'likes/getLikedObjectIds',
    async () => {
        const response = await nodecosmos.get('/likes/liked_object_ids');

        return response.data;
    },
);

export const getLikesCount = createAsyncThunk(
    'nodes/getLikesCount',
    async (objectId: UUID): Promise<LikesCountResponse> => {
        const response = await nodecosmos.get(`/likes/${objectId}`);

        return response.data;
    },
);

export const likeObject = createAsyncThunk(
    'nodes/likeObject',
    async (objectId: UUID): Promise<LikesCountResponse> => {
        const response = await nodecosmos.post('/likes', {
            object_type: LikeType.Node,
            objectId,
        });

        return response.data;
    },
);

export const unlikeObject = createAsyncThunk(
    'nodes/unlikeObject',
    async (objectId: UUID): Promise<LikesCountResponse> => {
        const response = await nodecosmos.delete(`/likes/${objectId}`);

        return response.data;
    },
);
