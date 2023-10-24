import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';
import { FlowPrimaryKey, FlowUpsertPayload } from './types';

export const createFlow = createAsyncThunk(
    'flows/createFlow',
    async (payload: FlowUpsertPayload) => {
        const response = await nodecosmos.post('/flows', payload);

        return response.data;
    },
);

export const getFlowDescription = createAsyncThunk(
    'flows/getDescription',
    async (payload: FlowPrimaryKey) => {
        const {
            nodeId, workflowId, startIndex, verticalIndex, id, 
        } = payload;
        const response = await nodecosmos.get(
            `flows/${nodeId}/${workflowId}/${startIndex}/${verticalIndex}/${id}/description`,
        );

        return response.data;
    },
);

export const updateFlowTitle = createAsyncThunk(
    'flows/updateFlowTitle',
    async (payload: FlowUpsertPayload) => {
        const response = await nodecosmos.put('/flows/title', payload);

        return response.data;
    },
);

export const updateFlowDescription = createAsyncThunk(
    'flows/updateFlowDescription',
    async (payload: FlowUpsertPayload) => {
        const response = await nodecosmos.put('/flows/description', payload);

        return response.data;
    },
);

export const deleteFlow = createAsyncThunk(
    'flows/deleteFlow',
    async (payload: FlowPrimaryKey) => {
        const {
            nodeId, workflowId, startIndex, verticalIndex, id, 
        } = payload;

        const response = await nodecosmos.delete(
            `flows/${nodeId}/${workflowId}/${startIndex}/${verticalIndex}/${id}/`,
        );

        return response.data;
    },
);
