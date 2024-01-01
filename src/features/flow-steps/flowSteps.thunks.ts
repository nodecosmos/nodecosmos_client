import {
    FlowStep,
    FlowStepCreationParams, FlowStepPrimaryKey, FlowStepUpdatePayload,
} from './types';
import nodecosmos from '../../api/nodecosmos-server';
import { Strict } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createFlowStep = createAsyncThunk(
    'flow_steps/createFlowStep',
    async (payload: Strict<FlowStepCreationParams>): Promise<FlowStep> => {
        const response = await nodecosmos.post('/flow_steps', payload);

        return response.data;
    },
);

export const updateFlowStepNodes = createAsyncThunk(
    'flow_steps/updateFlowStepNodes',
    async (payload: Strict<FlowStepUpdatePayload>): Promise<Partial<FlowStep>> => {
        const response = await nodecosmos.put('/flow_steps/nodes', payload);

        return response.data;
    },
);

export const updateFlowStepOutputs = createAsyncThunk(
    'flow_steps/updateFlowStepOutputs',
    async (payload: FlowStepUpdatePayload): Promise<Partial<FlowStep>> => {
        const response = await nodecosmos.put('/flow_steps/outputs', payload);

        return response.data;
    },
);

export const updateFlowStepInputs = createAsyncThunk(
    'flow_steps/updateFlowStepInputs',
    async (payload: FlowStepUpdatePayload): Promise<Partial<FlowStep>> => {
        const response = await nodecosmos.put('/flow_steps/inputs', payload);

        return response.data;
    },
);

export const deleteFlowStep = createAsyncThunk(
    'flow_steps/deleteFlowStep',
    async (payload: FlowStepPrimaryKey): Promise<Partial<FlowStep>> => {
        const {
            nodeId, workflowId, flowId, flowIndex, id,
        } = payload;

        const response = await nodecosmos.delete(`/flow_steps/${nodeId}/${workflowId}/${flowId}/${flowIndex}/${id}`);

        return response.data;
    },
);
