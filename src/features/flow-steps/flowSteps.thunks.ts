import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';
import { FlowStepPrimaryKey, FlowStepUpsertPayload } from './types';

export const createFlowStep = createAsyncThunk(
    'flow_steps/createFlowStep',
    async (payload: FlowStepUpsertPayload) => {
        const response = await nodecosmos.post('/flow_steps', payload);

        return response.data;
    },
);

export const updateFlowStepNodes = createAsyncThunk(
    'flow_steps/updateFlowStepNodes',
    async (payload: FlowStepUpsertPayload) => {
        const response = await nodecosmos.put('/flow_steps/nodes', payload);

        return response.data;
    },
);

export const updateFlowStepOutputs = createAsyncThunk(
    'flow_steps/updateFlowStepOutputs',
    async (payload: FlowStepUpsertPayload) => {
        const response = await nodecosmos.put('/flow_steps/outputs', payload);

        return response.data;
    },
);

export const updateFlowStepInputs = createAsyncThunk(
    'flow_steps/updateFlowStepInputs',
    async (payload: FlowStepUpsertPayload) => {
        const response = await nodecosmos.put('/flow_steps/inputs', payload);

        return response.data;
    },
);

export const deleteFlowStep = createAsyncThunk(
    'flow_steps/deleteFlowStep',
    async (payload: FlowStepPrimaryKey) => {
        const {
            nodeId, workflowId, flowId, flowIndex, id, 
        } = payload;

        const response = await nodecosmos.delete(`/flow_steps/${nodeId}/${workflowId}/${flowId}/${flowIndex}/${id}`);

        return response.data;
    },
);
