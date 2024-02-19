import {
    CurrentUser, UpdateUserBase, User, UserCreateForm,
} from './users.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosDispatch, RootState } from '../../store';
import { NodecosmosError } from '../../types';
import { SYNC_UP_INTERVAL } from '../app/constants';
import { getUserLikes } from '../likes/likes.thunks';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export interface LoginForm {
    usernameOrEmail: string;
    password: string;
}

export const logIn = createAsyncThunk<CurrentUser, LoginForm, { rejectValue: NodecosmosError }>(
    'users/logIn',
    async (loginForm, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.post('/users/session/login', loginForm);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

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

export const syncUpCurrentUser = createAsyncThunk<
    CurrentUser,
    void,
    { rejectValue: NodecosmosError, dispatch: NodecosmosDispatch, state: RootState }
>(
    'users/syncUpCurrentUser',
    async (_, {
        rejectWithValue, fulfillWithValue, dispatch, getState,
    }) => {
        const state = getState();
        const currentUser = state.users.currentUser;
        const likes = state.likes.byBranchId;

        if (!currentUser) {
            return rejectWithValue({ message: 'No current user' });
        }

        if ((Date.now() - currentUser.lastSyncUpAt.getTime()) < SYNC_UP_INTERVAL) {
            if (Object.keys(likes).length === 0) {
                await dispatch(getUserLikes());
            }
            return fulfillWithValue({ ...currentUser });
        }

        try {
            const response = await nodecosmos.get('/users/session/sync');
            dispatch(getUserLikes());

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const logOut = createAsyncThunk<void, void, { rejectValue: NodecosmosError }>(
    'users/logOut',
    async (_, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.delete('/users/session/logout');
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const create = createAsyncThunk<CurrentUser, UserCreateForm, { rejectValue: NodecosmosError }>(
    'users/create',
    async (user, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.post('/users', user);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

interface UpdateBioPayload extends UpdateUserBase {
    bio: string;
}

export const updateBio = createAsyncThunk<UpdateBioPayload, UpdateBioPayload, { rejectValue: NodecosmosError }>(
    'users/updateBio',
    async (updateUserBase, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/users/bio', updateUserBase);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);
