import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

export const createFlow = createAsyncThunk(
  'flows/createFlow',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/flows', payload);

    return response.data;
  },
);

export const getFlowDescription = createAsyncThunk(
  'flows/getDescription',
  async (payload, _thunkAPI) => {
    const { nodeId, workflowId, id } = payload;
    const response = await nodecosmos.get(`flows/${nodeId}/${workflowId}/${id}/description`);

    return response.data;
  },
);

export const updateFlowTitle = createAsyncThunk(
  'flows/updateFlowTitle',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.put('/flows/title', payload);

    return response.data;
  },
);

export const updateFlowDescription = createAsyncThunk(
  'flows/updateFlowDescription',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.put('/flows/description', payload);

    return response.data;
  },
);

export const deleteFlow = createAsyncThunk(
  'flows/deleteFlow',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.delete(`/flows/${payload.nodeId}/${payload.workflowId}/${payload.id}`);

    return response.data;
  },
);
