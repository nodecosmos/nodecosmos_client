import {
    Workflow, WorkflowData, WorkflowUpsertPayload, 
} from './types';
import nodecosmos from '../../apis/nodecosmos-server';
import { UUID } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const showWorkflow = createAsyncThunk(
    'workflows/showWorkflow',
    async (nodeId: UUID): Promise<WorkflowData> => {
        const response = await nodecosmos.get(`/workflows/${nodeId}`);

        return response.data;
    },
);

export const createWorkflow = createAsyncThunk(
    'workflows/createWorkflow',
    async (payload: WorkflowUpsertPayload): Promise<{ workflow: Workflow }> => {
        const response = await nodecosmos.post('/workflows', payload);

        return response.data;
    },
);

export const deleteWorkflow = createAsyncThunk(
    'workflows/deleteWorkflow',
    async (payload: {nodeId: UUID, id: UUID}): Promise<{ workflow: Workflow }> => {
        const response = await nodecosmos.delete(`/workflows/${payload.nodeId}/${payload.id}`);

        return response.data;
    },
);

export const updateWorkflowDescription = createAsyncThunk(
    'workflows/updateWorkflowDescription',
    async (payload: WorkflowUpsertPayload): Promise<{ workflow: Workflow }> => {
        const response = await nodecosmos.patch('/workflows/description', payload);

        return response.data;
    },
);

export const updateWorkflowInitialInputs = createAsyncThunk(
    'workflows/updateWorkflowInitialInputs',
    async (payload: WorkflowUpsertPayload): Promise<{ workflow: Workflow }> => {
        const response = await nodecosmos.put('/workflows/initial_input_ids', payload);

        return response.data;
    },
);
