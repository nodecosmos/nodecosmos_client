import { Notification } from './notifications.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

interface IndexResponse {
    notifications: Notification[];
    pagingState: string;
}

interface Params {
    new?: boolean;
}

export const getNotifications = createAsyncThunk<IndexResponse, Params | undefined, { rejectValue: NodecosmosError }>(
    'notifications/getNotifications',
    async (params, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get('/notifications/', { params });

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while fetching the notifications.',
                viewMessage: true,
            });
        }
    },
);

export const markAllAsRead = createAsyncThunk<void, void, { rejectValue: NodecosmosError }>(
    'notifications/markAllAsRead',
    async (_, { rejectWithValue }) => {
        try {
            await nodecosmos.post('/notifications/mark_all_as_read');
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while marking all notifications as read.',
                viewMessage: true,
            });
        }
    },
);
