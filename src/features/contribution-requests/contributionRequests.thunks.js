import nodecosmos from '../../apis/nodecosmos-server';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const indexContributionRequests = createAsyncThunk(
    'contributionRequests/indexContributionRequests',
    async (nodeId) => {
        const response = await nodecosmos.get(`/contribution_requests/${nodeId}`);
        return response.data;
    },
);

export const showContributionRequest = createAsyncThunk(
    'contributionRequests/showContributionRequest',
    async ({
        nodeId,
        id,
    }) => {
        const response = await nodecosmos.get(`/contribution_requests/${nodeId}/${id}`);
        return response.data;
    },
);

export const createContributionRequest = createAsyncThunk(
    'contributionRequests/createContributionRequest',
    async (payload) => {
        const response = await nodecosmos.post('/contribution_requests', payload);
        return response.data;
    },
);

export const updateContributionRequestTitle = createAsyncThunk(
    'contributionRequests/updateContributionRequestTitle',
    async (payload) => {
        const response = await nodecosmos.patch('/contribution_requests/title', payload);
        return response.data;
    },
);

export const updateContributionRequestDescription = createAsyncThunk(
    'contributionRequests/updateContributionRequestDescription',
    async (payload) => {
        const response = await nodecosmos.patch('/contribution_requests/description', payload);
        return response.data;
    },
);

export const deleteContributionRequest = createAsyncThunk(
    'contributionRequests/deleteContributionRequest',
    async ({ nodeId, id }) => {
        const response = await nodecosmos.delete(`/contribution_requests/${nodeId}/${id}`);
        return response.data;
    },
);
