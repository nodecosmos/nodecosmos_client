import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

export const createIO = createAsyncThunk(
  'inputOutputs/create',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/input_outputs', payload);

    return response.data;
  },
);

export const getIODescription = createAsyncThunk(
  'inputOutputs/getDescription',
  async (payload, _thunkAPI) => {
    const {
      nodeId, workflowId, workflowIndex, id,
    } = payload;
    const response = await nodecosmos.get(`input_outputs/${nodeId}/${workflowId}/${workflowIndex}/${id}/description`);

    return response.data;
  },
);

export const updateIOTitle = createAsyncThunk(
  'inputOutputs/updateTitle',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.put('/input_outputs/title', payload);

    return response.data;
  },
);

export const updateIODescription = createAsyncThunk(
  'inputOutputs/updateDescription',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.put('/input_outputs/description', payload);

    return response.data;
  },
);

export const deleteIO = createAsyncThunk(
  'inputOutputs/delete',
  async (payload, _thunkAPI) => {
    const {
      nodeId, workflowId, workflowIndex, id,
    } = payload;

    const response = await nodecosmos.delete(`input_outputs/${nodeId}/${workflowId}/${workflowIndex}/${id}`);

    return response.data;
  },
);
