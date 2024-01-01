import {
    InputOutput,
    InsertInputOutputPayload, PrimaryKey, UpdateIODescriptionPayload, UpdateIOTitlePayload,
} from './types';
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

export const getIODescription = createAsyncThunk(
    'inputOutputs/getDescription',
    async (payload: PrimaryKey): Promise<Partial<InputOutput>> => {
        const {
            rootNodeId, nodeId, workflowId, id,
        } = payload;
        const response = await nodecosmos.get(
            `input_outputs/${rootNodeId}/${nodeId}/${workflowId}/${id}/description`,
        );

        return response.data;
    },
);

export const updateIOTitle = createAsyncThunk(
    'inputOutputs/updateTitle',
    async (payload: UpdateIOTitlePayload): Promise<Partial<InputOutput>> => {
        const response = await nodecosmos.put('/input_outputs/title', payload);

        return response.data;
    },
);

export const updateIODescription = createAsyncThunk(
    'inputOutputs/updateDescription',
    async (payload: UpdateIODescriptionPayload): Promise<Partial<InputOutput>> => {
        const response = await nodecosmos.put('/input_outputs/description', payload);

        return response.data;
    },
);

export const deleteIO = createAsyncThunk(
    'inputOutputs/delete',
    async (payload: PrimaryKey): Promise<Partial<InputOutput>> => {
        const {
            rootNodeId, nodeId, workflowId, id,
        } = payload;

        const response = await nodecosmos.delete(
            `input_outputs/${rootNodeId}/${nodeId}/${workflowId}/${id}`,
        );

        return response.data;
    },
);
