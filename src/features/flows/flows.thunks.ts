import {
    Flow, FlowPrimaryKey, FlowUpsertPayload,
} from './flows.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createFlow = createAsyncThunk<
    Flow,
    FlowUpsertPayload,
    { rejectValue: NodecosmosError }
>(
    'flows/createFlow',
    async (payload: FlowUpsertPayload): Promise<Flow> => {
        const response = await nodecosmos.post('/flows', payload);

        return response.data;
    },
);

export const updateFlowTitle = createAsyncThunk<
    Partial<Flow> & FlowPrimaryKey,
    FlowUpsertPayload,
    { rejectValue: NodecosmosError }
>(
    'flows/updateFlowTitle',
    async (payload) => {
        const response = await nodecosmos.put('/flows/title', payload);

        return response.data;
    },
);

export const deleteFlow = createAsyncThunk<
    Partial<Flow> & FlowPrimaryKey,
    FlowPrimaryKey,
    { rejectValue: NodecosmosError }
>(
    'flows/deleteFlow',
    async (payload) => {
        const {
            nodeId, branchId, verticalIndex, startIndex, id,
        } = payload;

        const response = await nodecosmos.delete(
            `/flows/${nodeId}/${branchId}/${verticalIndex}/${startIndex}/${id}`,
        );

        return response.data;
    },
);
