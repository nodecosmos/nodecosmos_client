import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

export const indexContributionRequests = createAsyncThunk(
  'contributionRequests/indexContributionRequests',
  async (nodeId, _thunkAPI) => {
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
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/contribution_requests', payload);
    return response.data;
  },
);

export const updateContributionRequestTitle = createAsyncThunk(
  'contributionRequests/updateContributionRequestTitle',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.patch('/contribution_requests/title', payload);
    return response.data;
  },
);

export const updateContributionRequestDescription = createAsyncThunk(
  'contributionRequests/updateContributionRequestDescription',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.patch('/contribution_requests/description', payload);
    return response.data;
  },
);

export const deleteContributionRequest = createAsyncThunk(
  'contributionRequests/deleteContributionRequest',
  async ({ nodeId, id }, _thunkAPI) => {
    const response = await nodecosmos.delete(`/contribution_requests/${nodeId}/${id}`);
    return response.data;
  },
);
