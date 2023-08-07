import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

export const indexContributionRequests = createAsyncThunk(
  'contributionRequests/indexContributionRequests',
  async (params, _thunkAPI) => {
    const response = await nodecosmos.get('/contribution-requests', params);
    return response.data;
  },
);

export const showContributionRequest = createAsyncThunk(
  'contributionRequests/showContributionRequest',
  async ({
    nodeId,
    Id,
  }) => {
    const response = await nodecosmos.get(`/contribution-requests/${nodeId}/${Id}`);
    return response.data;
  },
);

export const createContributionRequest = createAsyncThunk(
  'contributionRequests/createContributionRequest',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/contribution-requests', payload);
    return response.data;
  },
);

export const updateContributionRequestTitle = createAsyncThunk(
  'contributionRequests/updateContributionRequestTitle',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.patch('/contribution-requests/title', payload);
    return response.data;
  },
);

export const updateContributionRequestDescription = createAsyncThunk(
  'contributionRequests/updateContributionRequestDescription',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.patch('/contribution-requests/description', payload);
    return response.data;
  },
);

export const deleteContributionRequest = createAsyncThunk(
  'contributionRequests/deleteContributionRequest',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.delete('/contribution-requests', payload);
    return response.data;
  },
);
