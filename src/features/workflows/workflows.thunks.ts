import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';
import { UUID } from '../../types';
import { Flow } from '../flows/types';
import { InputOutput } from '../input-outputs/types';
import { FlowStep } from '../flow-steps/types';
import { Workflow } from './types';

export interface ShowWorkflowResponse {
    workflow: Workflow,
    flows: Flow[],
    flowSteps: FlowStep[],
    inputOutputs: InputOutput[]
}

export const showWorkflow = createAsyncThunk(
    'workflows/showWorkflow',
    async (nodeId): Promise<ShowWorkflowResponse> => {
        const response = await nodecosmos.get(`/workflows/${nodeId}`);

        return response.data;
    },
);

export const createWorkflow = createAsyncThunk(
    'workflows/createWorkflow',
    async (payload) => {
        const response = await nodecosmos.post('/workflows', payload);

        return response.data;
    },
);

export const deleteWorkflow = createAsyncThunk(
    'workflows/deleteWorkflow',
    async (payload: {nodeId: UUID, id: UUID}) => {
        const response = await nodecosmos.delete(`/workflows/${payload.nodeId}/${payload.id}`);

        return response.data;
    },
);

export const updateWorkflowDescription = createAsyncThunk(
    'workflows/updateWorkflowDescription',
    async (payload) => {
        const response = await nodecosmos.patch('/workflows/description', payload);

        return response.data;
    },
);

export const updateWorkflowInitialInputs = createAsyncThunk(
    'workflows/updateWorkflowInitialInputs',
    async (payload) => {
        const response = await nodecosmos.put('/workflows/initial_input_ids', payload);

        return response.data;
    },
);
