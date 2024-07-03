import {
    CurrentUser, UpdateUserBase, User, UserCreateForm,
} from './users.types';
import nodecosmos from '../../api/nodecosmos-server';
import { RootState } from '../../store';
import {
    HttpErrorCodes, NodecosmosError, UUID,
} from '../../types';
import { SYNC_UP_INTERVAL } from '../app/constants';
import { LikePrimaryKey } from '../likes/likes.types';
import { NodeByOwner } from '../nodes/nodes.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export interface LoginForm {
    usernameOrEmail: string;
    password: string;
    rToken?: string;
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

interface UserByUsernameResponse {
    user: User;
    rootNodes: NodeByOwner[];
}

export const showUserByUsername = createAsyncThunk<UserByUsernameResponse, string, { rejectValue: NodecosmosError }>(
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
    { user: CurrentUser, likes: LikePrimaryKey[] },
    void,
    { rejectValue: NodecosmosError, state: RootState }
>(
    'users/syncUpCurrentUser',
    async (_, {
        rejectWithValue, fulfillWithValue, getState,
    }) => {
        const state = getState();
        const currentUser = state.users.currentUser;
        // branchId, objectId, liked
        const currentUserLikes: Record<UUID, Record<UUID, boolean>> = state.likes.currentUserLikes;

        if (!currentUser) {
            return rejectWithValue({
                status: HttpErrorCodes.Unauthorized,
                message: 'No current user',
            });
        }

        if ((Date.now() - currentUser.lastSyncUpAt.getTime()) < SYNC_UP_INTERVAL) {
            const likes: LikePrimaryKey[] = [];
            Object.keys(currentUserLikes).forEach((branchId: UUID) => {
                const branchLikes = currentUserLikes[branchId];
                Object.keys(branchLikes).forEach((objectId) => {
                    if (branchLikes[objectId]) {
                        likes.push({
                            branchId,
                            objectId,
                            userId: currentUser.id,
                        });
                    }
                });
            });

            return fulfillWithValue({
                user: currentUser,
                likes,
            });
        }

        try {
            const response = await nodecosmos.get('/users/session/sync');

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: HttpErrorCodes.InternalServerError,
                message: 'An error occurred while syncing up the current user',
            });
        }
    },
);

export const resendConfirmationEmail = createAsyncThunk<void, void, { rejectValue: NodecosmosError }>(
    'users/resendConfirmationEmail',
    async (_, { rejectWithValue }) => {
        try {
            await nodecosmos.post('/users/resend_confirmation_email');
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: HttpErrorCodes.InternalServerError,
                message: 'An error occurred while resending the confirmation email. Please try again later.',
            });
        }
    },
);

export const confirmEmail = createAsyncThunk<{ id: UUID; email: string }, string, { rejectValue: NodecosmosError }>(
    'users/confirmEmail',
    async (token, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.post(`/users/confirm_email/${token}`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: HttpErrorCodes.InternalServerError,
                message: 'An error occurred while confirming the email. Please try again later.',
            });
        }
    },
);

export const resetPasswordRequest = createAsyncThunk<void, string, { rejectValue: NodecosmosError }>(
    'users/resetPassword',
    async (email, { rejectWithValue }) => {
        try {
            await nodecosmos.post('/users/reset_password', { email });
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: HttpErrorCodes.InternalServerError,
                message: 'An error occurred while requesting a password reset. Please try again later.',
            });
        }
    },

);

export const updatePassword = createAsyncThunk<
    { email: string },
    { password: string; token: string },
    { rejectValue: NodecosmosError }
>(
    'users/updatePassword',
    async ({ password, token }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/users/update_password', {
                password,
                token,
            });

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: HttpErrorCodes.InternalServerError,
                message: 'An error occurred while updating the password. Please try again later.',
            });
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

            return rejectWithValue({
                status: HttpErrorCodes.InternalServerError,
                message: 'An error occurred while logging out. Please try again later.',
            });
        }
    },
);

interface UserCreatePayload extends UserCreateForm {
    token: string | null;

    // reCaptcha token
    rToken?: string | null;
}
export const create = createAsyncThunk<CurrentUser | null, UserCreatePayload, { rejectValue: NodecosmosError }>(
    'users/create',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.post(`/users?token=${payload.token}&rToken=${payload.rToken}`, payload);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: HttpErrorCodes.InternalServerError,
                message: 'An error occurred while creating the current user. Please try again later.',
            });
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

            return rejectWithValue({
                status: HttpErrorCodes.InternalServerError,
                message: 'An error occurred while updating the bio. Please try again later.',
            });
        }
    },
);

export const searchUsers = createAsyncThunk<User[], string, { rejectValue: NodecosmosError }>(
    'users/searchUsers',
    async (query, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/users/search/user?q=${query}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: HttpErrorCodes.InternalServerError,
                message: 'An error occurred while searching for users. Please try again later.',
            });
        }
    },
);
