import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

// eslint-disable-next-line import/prefer-default-export
export const getLikedObjectIds = createAsyncThunk(
    'likes/getLikedObjectIds',
    async (payload) => {
        const response = await nodecosmos.get('/likes/liked_object_ids');

        return response.data;
    },
);
