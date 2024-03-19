import {
    InputOutput,
    InsertInputOutputPayload, InputOutputPrimaryKey, UpdateIODescriptionPayload, UpdateIOTitlePayload,
} from './inputOutputs.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const createIO = createAsyncThunk<InputOutput, InsertInputOutputPayload, { rejectValue: NodecosmosError }>(
    'inputOutputs/create',
    async (payload: InsertInputOutputPayload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.post('/input_outputs', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const getIODescription = createAsyncThunk<
    Partial<InputOutput> & InputOutputPrimaryKey,
    InputOutputPrimaryKey,
    { rejectValue: NodecosmosError }
>(
    'inputOutputs/getDescription',
    async (payload: InputOutputPrimaryKey) => {
        const {
            rootNodeId, nodeId, branchId, workflowId, id,
        } = payload;
        const response = await nodecosmos.get(
            `input_outputs/${rootNodeId}/${nodeId}/${branchId}/${workflowId}/${id}/description`,
        );

        return response.data;
    },
);

export const updateIOTitle = createAsyncThunk<
    Partial<InputOutput> & InputOutputPrimaryKey,
    UpdateIOTitlePayload,
    { rejectValue: NodecosmosError }
>(
    'inputOutputs/updateTitle',
    async (payload) => {
        const response = await nodecosmos.put('/input_outputs/title', payload);

        return response.data;
    },
);

export const updateIODescription = createAsyncThunk<
    Partial<InputOutput> & InputOutputPrimaryKey,
    UpdateIODescriptionPayload,
    { rejectValue: NodecosmosError }
>(
    'inputOutputs/updateDescription',
    async (payload: UpdateIODescriptionPayload) => {
        const response = await nodecosmos.put('/input_outputs/description', payload);

        return response.data;
    },
);

export const deleteIO = createAsyncThunk<
    Partial<InputOutput> & InputOutputPrimaryKey,
    InputOutputPrimaryKey,
    { rejectValue: NodecosmosError }
>(
    'inputOutputs/delete',
    async (payload: InputOutputPrimaryKey) => {
        const {
            rootNodeId, nodeId, branchId, workflowId, id,
        } = payload;

        const response = await nodecosmos.delete(
            `input_outputs/${rootNodeId}/${nodeId}/${branchId}/${workflowId}/${id}`,
        );

        return response.data;
    },
);
