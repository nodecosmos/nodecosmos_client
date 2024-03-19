import {
    Workflow, WorkflowData, WorkflowUpsertPayload,
} from './workflow.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError, UUID } from '../../types';
import { InputOutput } from '../input-outputs/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const showWorkflow = createAsyncThunk(
    'workflows/showWorkflow',
    async (nodeId: UUID): Promise<WorkflowData> => {
        const response = await nodecosmos.get(`/workflows/${nodeId}`);

        return response.data;
    },
);

interface WorkflowResponse {
    workflow: Workflow;
    inputOutputs: InputOutput[];
}

// in case workflow exists
interface RejectValue extends NodecosmosError {
    workflow?: Workflow;
    inputOutputs?: InputOutput[];
}

export const createWorkflow = createAsyncThunk<
    WorkflowResponse,
    WorkflowUpsertPayload,
    { rejectValue: RejectValue }
>(
    'workflows/createWorkflow',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.post('/workflows', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const deleteWorkflow = createAsyncThunk(
    'workflows/deleteWorkflow',
    async (payload: {nodeId: UUID, id: UUID}): Promise<Workflow> => {
        const response = await nodecosmos.delete(`/workflows/${payload.nodeId}/${payload.id}`);

        return response.data;
    },
);

export const updateWorkflowInitialInputs = createAsyncThunk(
    'workflows/updateWorkflowInitialInputs',
    async (payload: WorkflowUpsertPayload): Promise<Workflow> => {
        const response = await nodecosmos.put('/workflows/initial_input_ids', payload);

        return response.data;
    },
);
