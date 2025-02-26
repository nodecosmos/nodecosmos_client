import { Subscription } from './subscriptions.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError, UUID } from '../../types';
import { ShowUser } from '../users/users.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

interface ShowSubscriptionData {
    subscription: Subscription;
    users: ShowUser[];
}

export const showSubscription = createAsyncThunk<ShowSubscriptionData, UUID, { rejectValue: NodecosmosError }>(
    'subscriptions/showSubscription',
    async (rootId, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/subscriptions/${rootId}`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while getting the editors.',
                viewMessage: true,
            });
        }
    },
);

export const deleteMember = createAsyncThunk<
    null,
    { rootId: UUID, memberId: UUID },
    { rejectValue: NodecosmosError }
>(
    'subscriptions/deleteMember',
    async ({ rootId, memberId }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.delete(`/subscriptions/${rootId}/member/${memberId}`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while deleting the editor.',
                viewMessage: true,
            });
        }
    },
);
