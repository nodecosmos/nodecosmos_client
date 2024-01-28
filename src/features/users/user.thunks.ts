import { User } from './user.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const showUserByUsername = createAsyncThunk<User, string, { rejectValue: NodecosmosError }>(
    'users/showUserByUsername',
    async (username, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/users/${username}/username`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            throw error;
        }
    },
);
