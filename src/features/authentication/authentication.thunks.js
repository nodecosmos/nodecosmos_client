import nodecosmos from '../../api/nodecosmos-server';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const syncUpCurrentUser = createAsyncThunk(
    'auth/syncUpCurrentUser',
    async () => {
        try {
            const response = await nodecosmos.get('/sessions/sync');
            return response.data;
        } catch ({ response }) {
            return response.data.error;
        }
    },
);

export const logOut = createAsyncThunk(
    'auth/logOut',
    async () => {
        try {
            const response = await nodecosmos.delete('/sessions/logout');
            return response.data;
        } catch ({ response }) {
            return response.data.error;
        }
    },
);
