import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

export const createIo = createAsyncThunk(
  'inputOutputs/create',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/input_outputs', payload);

    return response.data;
  },
);

export const getIODescription = createAsyncThunk(
  'inputOutputs/getDescription',
  async (payload, _thunkAPI) => {
    const { nodeId, workflowId, id } = payload;
    const response = await nodecosmos.get(`input_outputs/${nodeId}/${workflowId}/${id}/description`);

    return response.data;
  },
);

export const updateIoTitle = createAsyncThunk(
  'inputOutputs/updateTitle',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.patch('/input_outputs/title', payload);

    return response.data;
  },
);

export const updateIoDescription = createAsyncThunk(
  'inputOutputs/updateDescription',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.put('/input_outputs/description', payload);

    return response.data;
  },
);
