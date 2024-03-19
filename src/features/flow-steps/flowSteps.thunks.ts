import {
    FlowStep,
    FlowStepCreationParams, FlowStepPrimaryKey, FlowStepUpdatePayload,
} from './flowSteps.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError, Strict } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createFlowStep = createAsyncThunk(
    'flow_steps/createFlowStep',
    async (payload: Strict<FlowStepCreationParams>): Promise<FlowStep> => {
        const response = await nodecosmos.post('/flow_steps', payload);

        return response.data;
    },
);

export const updateFlowStepNodes = createAsyncThunk<
    Partial<FlowStep> & FlowStepPrimaryKey,
    FlowStepUpdatePayload,
    { rejectValue: NodecosmosError }
>(
    'flow_steps/updateFlowStepNodes',
    async (payload) => {
        const response = await nodecosmos.put('/flow_steps/nodes', payload);

        return response.data;
    },
);

export const updateFlowStepOutputs = createAsyncThunk<
    Partial<FlowStep> & FlowStepPrimaryKey,
    FlowStepUpdatePayload,
    { rejectValue: NodecosmosError }
>(
    'flow_steps/updateFlowStepOutputs',
    async (payload) => {
        const response = await nodecosmos.put('/flow_steps/outputs', payload);

        return response.data;
    },
);

export const updateFlowStepInputs = createAsyncThunk<
    Partial<FlowStep> & FlowStepPrimaryKey,
    FlowStepUpdatePayload,
    { rejectValue: NodecosmosError }
>(
    'flow_steps/updateFlowStepInputs',
    async (payload: FlowStepUpdatePayload) => {
        const response = await nodecosmos.put('/flow_steps/inputs', payload);

        return response.data;
    },
);

export const deleteFlowStep = createAsyncThunk<
    Partial<FlowStep> & FlowStepPrimaryKey,
    FlowStepPrimaryKey,
    { rejectValue: NodecosmosError }
>(
    'flow_steps/deleteFlowStep',
    async (payload) => {
        const {
            nodeId, branchId, workflowId, flowId, flowIndex, id,
        } = payload;

        const response = await nodecosmos.delete(
            `/flow_steps/${nodeId}/${branchId}/${workflowId}/${flowId}/${flowIndex}/${id}`,
        );

        return response.data;
    },
);
