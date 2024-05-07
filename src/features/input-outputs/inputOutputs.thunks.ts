import {
    InputOutput,
    InsertInputOutputPayload, InputOutputPrimaryKey, UpdateIoTitlePayload,
} from './inputOutputs.types';
import nodecosmos from '../../api/nodecosmos-server';
import { RootState } from '../../store';
import { NodecosmosError, WithBranchId } from '../../types';
import { BranchMetadata, WithBranchMetadata } from '../branch/branches.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const createIo = createAsyncThunk<
    InputOutput,
    WithBranchId<InsertInputOutputPayload>,
    { rejectValue: NodecosmosError }
>(
    'inputOutputs/create',
    async (payload, { rejectWithValue }) => {
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

export const updateIoTitle = createAsyncThunk<
    Partial<InputOutput> & InputOutputPrimaryKey,
    WithBranchId<UpdateIoTitlePayload>,
    { rejectValue: NodecosmosError }
>(
    'inputOutputs/updateTitle',
    async (payload) => {
        const response = await nodecosmos.put('/input_outputs/title', payload);

        return response.data;
    },
);

export const deleteIo = createAsyncThunk<
    WithBranchMetadata<Partial<InputOutput> & InputOutputPrimaryKey>,
    WithBranchId<InputOutputPrimaryKey>,
    { state: RootState, rejectValue: NodecosmosError }
>(
    'inputOutputs/delete',
    async (payload, { rejectWithValue, getState }) => {
        try {
            const {
                rootId, nodeId, branchId, id,
            } = payload;

            const response = await nodecosmos.delete(
                `/input_outputs/${rootId}/${nodeId}/${branchId}/${id}`,
            );

            const metadata: BranchMetadata = {};

            const state = getState();
            const branch = state.branches.byId[branchId];

            if (branch) {
                metadata.deleteFromState = branch.createdIos.has(id) || branch.restoredIos.has(id);
            } else {
                metadata.deleteFromState = true;
            }

            return {
                data: response.data,
                metadata,
            };
        }
        catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while deleting the flow step.',
                viewMessage: true,
            });
        }
    },
);
