import { Invitation, InvitationPrimaryKey } from './invitations.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError } from '../../types';
import { Node } from '../nodes/nodes.types';
import { User } from '../users/users.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const IndexInvitations = createAsyncThunk<
    Invitation[],
    Omit<InvitationPrimaryKey, 'usernameOrEmail'>,
    { rejectValue: NodecosmosError }
>(
    'invitations/index',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/invitations/index/${payload.nodeId}/${payload.branchId}`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while fetching the invitations.',
                viewMessage: true,
            });
        }
    },
);

export interface FindByTokenResponse {
    invitation: Invitation,
    inviter: User,
    node: Node,
    hasUser: boolean,
    inviteForDifferentUser: boolean
}

export const findByToken = createAsyncThunk<FindByTokenResponse, string, { rejectValue: NodecosmosError }>(
    'invitations/findByToken',
    async (token, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/invitations/${token}/token`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while fetching the invitation.',
                viewMessage: true,
            });
        }
    },
);

export const createInvitation = createAsyncThunk<Invitation, InvitationPrimaryKey, { rejectValue: NodecosmosError }>(
    'invitations/create',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.post('/invitations', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while creating the invitation.',
                viewMessage: true,
            });
        }
    },
);

export const confirmInvitation = createAsyncThunk<void, InvitationPrimaryKey, { rejectValue: NodecosmosError }>(
    'invitations/confirmInvitation',
    async (payload, { rejectWithValue }) => {
        try {
            await nodecosmos.put('/invitations/confirm', payload);

            return;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while confirming the invitation.',
                viewMessage: true,
            });
        }
    },
);

export const rejectInvitation = createAsyncThunk<void, InvitationPrimaryKey, { rejectValue: NodecosmosError }>(
    'invitations/rejectInvitation',
    async (payload, { rejectWithValue }) => {
        try {
            await nodecosmos.put('/invitations/reject', payload);

            return;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while rejecting the invitation.',
                viewMessage: true,
            });
        }
    },
);
