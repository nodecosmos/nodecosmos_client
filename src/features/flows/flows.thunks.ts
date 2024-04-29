import {
    Flow, FlowPrimaryKey, FlowUpsertPayload,
} from './flows.types';
import nodecosmos from '../../api/nodecosmos-server';
import { RootState } from '../../store';
import { NodecosmosError, RootId } from '../../types';
import { BranchMetadata, WithBranchMetadata } from '../branch/branches.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

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
    WithBranchMetadata<Partial<Flow> & FlowPrimaryKey>,
    FlowPrimaryKey & RootId,
    { state: RootState, rejectValue: NodecosmosError }
>(
    'flows/deleteFlow',
    async (payload, { rejectWithValue, getState }) => {
        try {
            const {
                nodeId, branchId, verticalIndex, startIndex, id, rootId,
            } = payload;

            const response = await nodecosmos.delete(
                `/flows/${branchId}/${nodeId}/${rootId}/${verticalIndex}/${startIndex}/${id}`,
            );

            const metadata: BranchMetadata = {};

            const state = getState();
            const branch = state.branches.byId[branchId];

            if (branch) {
                metadata.deleteFromState = branch.createdFlows.has(id) || branch.restoredFlows.has(id);
            } else {
                metadata.deleteFromState = true;
            }

            return {
                data: response.data,
                metadata,
            };
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while deleting the flow.',
                viewMessage: true,
            });
        }
    },
);
