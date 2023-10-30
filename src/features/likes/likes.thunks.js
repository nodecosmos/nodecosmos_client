import nodecosmos from '../../apis/nodecosmos-server';
import { createAsyncThunk } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const getLikedObjectIds = createAsyncThunk(
    'likes/getLikedObjectIds',
    async () => {
        const response = await nodecosmos.get('/likes/liked_object_ids');

        return response.data;
    },
);
