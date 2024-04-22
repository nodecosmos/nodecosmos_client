import {
    FlowStep,
    FlowStepCreationParams, FlowStepPrimaryKey, FlowStepUpdatePayload,
} from './flowSteps.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError, WithRootId } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const createFlowStep = createAsyncThunk<
    FlowStep,
    FlowStepCreationParams,
    { rejectValue: NodecosmosError }
>(
    'flow_steps/createFlowStep',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.post('/flow_steps', payload);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
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
    async (payload) => {
        const response = await nodecosmos.put('/flow_steps/inputs', payload);

        return response.data;
    },
);

export const deleteFlowStep = createAsyncThunk<
    Partial<FlowStep> & FlowStepPrimaryKey,
    WithRootId<FlowStepPrimaryKey>,
    { rejectValue: NodecosmosError }
>(
    'flow_steps/deleteFlowStep',
    async (payload) => {
        // we use post as stepIndex is double that can't be passed in url
        const response = await nodecosmos.post('/flow_steps/delete', payload);

        return response.data;
    },
);
