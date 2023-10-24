import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';
import { InputOutputUpsertPayload, PrimaryKey } from './types';

export const createIO = createAsyncThunk(
    'inputOutputs/create',
    async (payload: InputOutputUpsertPayload) => {
        const response = await nodecosmos.post('/input_outputs', payload);

        return response.data;
    },
);

export const getIODescription = createAsyncThunk(
    'inputOutputs/getDescription',
    async (payload: PrimaryKey) => {
        const {
            rootNodeId, nodeId, id, 
        } = payload;
        const response = await nodecosmos.get(
            `input_outputs/${rootNodeId}/${nodeId}/${id}/description`,
        );

        return response.data;
    },
);

export const updateIOTitle = createAsyncThunk(
    'inputOutputs/updateTitle',
    async (payload: InputOutputUpsertPayload) => {
        const response = await nodecosmos.put('/input_outputs/title', payload);

        return response.data;
    },
);

export const updateIODescription = createAsyncThunk(
    'inputOutputs/updateDescription',
    async (payload: InputOutputUpsertPayload) => {
        const response = await nodecosmos.put('/input_outputs/description', payload);

        return response.data;
    },
);

export const deleteIO = createAsyncThunk(
    'inputOutputs/delete',
    async (payload: PrimaryKey) => {
        const {
            rootNodeId, nodeId, id, 
        } = payload;

        const response = await nodecosmos.delete(
            `input_outputs/${rootNodeId}/${nodeId}/${id}`,
        );

        return response.data;
    },
);
