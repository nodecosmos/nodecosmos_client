import {
    InputOutput,
    InsertInputOutputPayload, InputOutputPrimaryKey, UpdateIoDescriptionPayload, UpdateIoTitlePayload,
} from './inputOutputs.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const createIo = createAsyncThunk<InputOutput, InsertInputOutputPayload, { rejectValue: NodecosmosError }>(
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

export const getIoDescription = createAsyncThunk<
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

export const updateIoTitle = createAsyncThunk<
    Partial<InputOutput> & InputOutputPrimaryKey,
    UpdateIoTitlePayload,
    { rejectValue: NodecosmosError }
>(
    'inputOutputs/updateTitle',
    async (payload) => {
        const response = await nodecosmos.put('/input_outputs/title', payload);

        return response.data;
    },
);

export const updateIoDescription = createAsyncThunk<
    Partial<InputOutput> & InputOutputPrimaryKey,
    UpdateIoDescriptionPayload,
    { rejectValue: NodecosmosError }
>(
    'inputOutputs/updateDescription',
    async (payload: UpdateIoDescriptionPayload) => {
        const response = await nodecosmos.put('/input_outputs/description', payload);

        return response.data;
    },
);

export const deleteIo = createAsyncThunk<
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
