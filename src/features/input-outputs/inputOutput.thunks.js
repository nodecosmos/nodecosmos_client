import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

export const createIo = createAsyncThunk(
  'inputOutputs/create',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/input_outputs', payload);

    return response.data;
  },
);

export const updateFlowTitle = createAsyncThunk(
  'inputOutputs/updateTitle',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.patch(`/input_outputs/${payload.id}/title`, payload);

    return response.data;
  },
);

export const updateFlowDescription = createAsyncThunk(
  'inputOutputs/updateDescription',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.patch(`/input_outputs/${payload.id}/description`, payload);

    return response.data;
  },
);
