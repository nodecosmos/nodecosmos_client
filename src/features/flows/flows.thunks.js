// For now thunks are handled automatically by extraReducers in nodesSlice and treesSlice.
// Rethink this approach as it may be too implicit.
import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

export const createFlow = createAsyncThunk(
  'nodes/createFlow',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/flows', payload);

    return response.data;
  },
);

export const updateFlowTitle = createAsyncThunk(
  'nodes/updateFlowTitle',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.patch(`/flows/${payload.id}/title`, payload);

    return response.data;
  },
);

export const updateFlowDescription = createAsyncThunk(
  'nodes/updateFlowDescription',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.patch(`/flows/${payload.id}/description`, payload);

    return response.data;
  },
);
