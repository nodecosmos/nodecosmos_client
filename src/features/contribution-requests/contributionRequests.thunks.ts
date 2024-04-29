import {
    BaseCR, ContributionRequest, CreateCRPayload, CRPrimaryKey, UpdateDescriptionCRPayload, UpdateTitleCRPayload,
} from './contributionRequest.types';
import nodecosmos from '../../api/nodecosmos-server';
import {
    NodecosmosError, UUID, WithRootId,
} from '../../types';
import { Branch } from '../branch/branches.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const indexContributionRequests = createAsyncThunk<BaseCR[], UUID, { rejectValue: NodecosmosError }>(
    'contributionRequests/indexContributionRequests',
    async (nodeId) => {
        const response = await nodecosmos.get(`/contribution_requests/${nodeId}`);
        return response.data;
    },
);

interface ShowResponse {
    contributionRequest: ContributionRequest;
    branch: Branch;
}

export const showContributionRequest = createAsyncThunk<
    ShowResponse,
    WithRootId<CRPrimaryKey>,
    { rejectValue: NodecosmosError }
>(
    'contributionRequests/showContributionRequest',
    async ({
        nodeId, rootId, id, 
    }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/contribution_requests/${nodeId}/${rootId}/${id}`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while fetching the contribution request.',
                viewMessage: true,
            });
        }
    },
);

export const createContributionRequest = createAsyncThunk<
    ContributionRequest,
    CreateCRPayload,
    { rejectValue: NodecosmosError }
>(
    'contributionRequests/createContributionRequest',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.post('/contribution_requests', payload);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while creating the contribution request.',
                viewMessage: true,
            });
        }
    },
);

export const updateContributionRequestTitle = createAsyncThunk<
    UpdateTitleCRPayload,
    UpdateTitleCRPayload,
    { rejectValue: NodecosmosError }
> (
    'contributionRequests/updateContributionRequestTitle',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/contribution_requests/title', payload);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while updating the contribution request title.',
                viewMessage: true,
            });
        }
    },
);

export const updateContributionRequestDescription = createAsyncThunk<
    UpdateDescriptionCRPayload,
    UpdateDescriptionCRPayload,
    { rejectValue: NodecosmosError }
>(
    'contributionRequests/updateContributionRequestDescription',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/contribution_requests/description', payload);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while updating the contribution request description.',
                viewMessage: true,
            });
        }
    },
);

export const deleteContributionRequest = createAsyncThunk<
    ContributionRequest,
    WithRootId<CRPrimaryKey>,
    { rejectValue: NodecosmosError }
>(
    'contributionRequests/deleteContributionRequest',
    async ({ nodeId, id }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.delete(`/contribution_requests/${nodeId}/${id}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while deleting the contribution request.',
                viewMessage: true,
            });
        }
    },
);

interface MergeRejectValue extends NodecosmosError {
    branch?: Branch;
}

export const mergeContributionRequest = createAsyncThunk<
    ContributionRequest,
    WithRootId<CRPrimaryKey>,
    { rejectValue: MergeRejectValue }
>(
    'contributionRequests/mergeContributionRequest',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/contribution_requests/merge', payload);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while merging the contribution request.',
                viewMessage: true,
            });
        }
    },
);
