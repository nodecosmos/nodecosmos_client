import {
    Workflow, WorkflowData, WorkflowPrimaryKey, WorkflowUpsertPayload,
} from './workflow.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError } from '../../types';
import { FlowStep } from '../flow-steps/flowSteps.types';
import { Flow } from '../flows/flows.types';
import { InputOutput } from '../input-outputs/inputOutputs.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

interface ShowWorkflowResponse {
    workflow: Workflow;
    flows: Flow[];
    flowSteps: FlowStep[];
    inputOutputs: InputOutput[];
}

export const showWorkflow = createAsyncThunk<
    ShowWorkflowResponse,
    Omit<WorkflowPrimaryKey, 'id'>,
    { rejectValue: NodecosmosError }
>(
    'workflows/showWorkflow',
    async ({ nodeId, branchId }): Promise<WorkflowData> => {
        const response = await nodecosmos.get(`/workflows/${nodeId}/${branchId}`);

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

export const deleteWorkflow = createAsyncThunk<
    Workflow,
    WorkflowPrimaryKey,
    { rejectValue: NodecosmosError }
>(
    'workflows/deleteWorkflow',
    async ({
        nodeId, branchId, id,
    }) => {
        const response = await nodecosmos.delete(`/workflows/${nodeId}/${branchId}/${id}`);

        return response.data;
    },
);

export const updateWorkflowInitialInputs = createAsyncThunk<
    Workflow,
    WorkflowUpsertPayload,
    { rejectValue: NodecosmosError }
>(
    'workflows/updateWorkflowInitialInputs',
    async (payload) => {
        const response = await nodecosmos.put('/workflows/initial_input_ids', payload);

        return response.data;
    },
);
