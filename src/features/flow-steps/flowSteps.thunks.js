import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

export const createFlowStep = createAsyncThunk(
  'flow_steps/createFlowStep',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/flow_steps', payload);

    return response.data;
  },
);

export const deleteFlowStep = createAsyncThunk(
  'flow_steps/deleteFlowStep',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.delete(`/flow_steps/${payload.nodeId}/${payload.workflowId}/${payload.id}`);

    return response.data;
  },
);
