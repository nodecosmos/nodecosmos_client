import {
    Workflow, WorkflowPrimaryKey, WorkflowUpsertPayload,
} from './workflow.types';
import nodecosmos from '../../api/nodecosmos-server';
import { RootState } from '../../store';
import { NodecosmosError, RootId } from '../../types';
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
    WorkflowPrimaryKey & RootId,
    { rejectValue: NodecosmosError, state: RootState }
>(
    'workflows/showWorkflow',
    async ({
        rootId, branchId, nodeId,
    }) => {
        const response = await nodecosmos.get(`/workflows/${rootId}/${branchId}/${nodeId}`);

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

export const indexWorkflowBranchData = createAsyncThunk<
    {
        flows: Flow[];
        flowSteps: FlowStep[];
        inputOutputs: InputOutput[];
    },
    WorkflowPrimaryKey & RootId
>(
    'workflows/indexWorkflowBranchData',
    async ({
        branchId, nodeId, rootId,
    }) => {
        const response = await nodecosmos.get(`/workflows/index/branch_data/${branchId}/${nodeId}/${rootId}`);

        return response.data;
    },
);
