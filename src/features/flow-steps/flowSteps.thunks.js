import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

export const createFlowStep = createAsyncThunk(
  'flow_steps/createFlowStep',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/flow_steps', payload);

    return response.data;
  },
);

export const updateFlowStepNodes = createAsyncThunk(
  'flow_steps/updateFlowStepNodes',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.put('/flow_steps/nodes', payload);

    return response.data;
  },
);

export const updateFlowStepOutputs = createAsyncThunk(
  'flow_steps/updateFlowStepOutputs',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.put('/flow_steps/outputs', payload);

    return response.data;
  },
);

export const updateFlowStepInputs = createAsyncThunk(
  'flow_steps/updateFlowStepInputs',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.put('/flow_steps/inputs', payload);

    return response.data;
  },
);

export const deleteFlowStep = createAsyncThunk(
  'flow_steps/deleteFlowStep',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos
      .delete(`/flow_steps/${payload.nodeId}/${payload.workflowId}/${payload.flowId}/${payload.id}`);

    return response.data;
  },
);
