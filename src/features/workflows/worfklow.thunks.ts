import {
    Workflow, WorkflowData, WorkflowPrimaryKey, WorkflowUpsertPayload,
} from './workflow.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError, WithOriginalId } from '../../types';
import { FlowStep } from '../flow-steps/flowSteps.types';
import { Flow } from '../flows/flows.types';
import { InputOutput } from '../input-outputs/inputOutputs.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface ShowWorkflowResponse {
    workflow: Workflow;
    flows: Flow[];
    flowSteps: FlowStep[];
    inputOutputs: InputOutput[];
}

export const showWorkflow = createAsyncThunk<
    ShowWorkflowResponse,
    WithOriginalId<WorkflowPrimaryKey>,
    { rejectValue: NodecosmosError }
>(
    'workflows/showWorkflow',
    async ({
        originalId, branchId, nodeId,
    }): Promise<WorkflowData> => {
        const response = await nodecosmos.get(`/workflows/${originalId}/${branchId}/${nodeId}`);

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

export const updateWorkflowTitle = createAsyncThunk<
    Workflow,
    WorkflowUpsertPayload,
    { rejectValue: NodecosmosError }
>(
    'workflows/title',
    async (payload) => {
        const response = await nodecosmos.put('/workflows/title', payload);

        return response.data;
    },
);
