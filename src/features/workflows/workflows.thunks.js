import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

export const showWorkflow = createAsyncThunk(
  'workflows/showWorkflow',
  async (nodeId, _thunkAPI) => {
    const response = await nodecosmos.get(`/workflows/${nodeId}`);

    return response.data;
  },
);

export const createWorkflow = createAsyncThunk(
  'workflows/createWorkflow',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/workflows', payload);

    return response.data;
  },
);

export const deleteWorkflow = createAsyncThunk(
  'workflows/deleteWorkflow',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.delete(`/workflows/${payload.nodeId}/${payload.id}`);

    return response.data;
  },
);

export const updateWorkflowDescription = createAsyncThunk(
  'workflows/updateWorkflowDescription',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.patch('/workflows/description', payload);

    return response.data;
  },
);

export const updateWorkflowInitialInputs = createAsyncThunk(
  'workflows/updateWorkflowInitialInputs',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.put('/workflows/initial_input_ids', payload);

    return response.data;
  },
);
