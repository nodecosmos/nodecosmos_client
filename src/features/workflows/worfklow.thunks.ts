import {
    Workflow, WorkflowData, WorkflowPrimaryKey, WorkflowUpsertPayload,
} from './workflow.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError } from '../../types';
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
    WorkflowPrimaryKey,
    { rejectValue: NodecosmosError }
>(
    'workflows/showWorkflow',
    async ({ nodeId, branchId }): Promise<WorkflowData> => {
        const response = await nodecosmos.get(`/workflows/${nodeId}/${branchId}`);

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
