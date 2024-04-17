import {
    InputOutput,
    InsertInputOutputPayload, InputOutputPrimaryKey, UpdateIoTitlePayload,
} from './inputOutputs.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError, WithCurrentBranchId } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const createIo = createAsyncThunk<
    InputOutput,
    WithCurrentBranchId<InsertInputOutputPayload>,
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
    WithCurrentBranchId<UpdateIoTitlePayload>,
    { rejectValue: NodecosmosError }
>(
    'inputOutputs/updateTitle',
    async (payload) => {
        const response = await nodecosmos.put('/input_outputs/title', payload);

        return response.data;
    },
);

export const deleteIo = createAsyncThunk<
    Partial<InputOutput> & InputOutputPrimaryKey,
    WithCurrentBranchId<InputOutputPrimaryKey>,
    { rejectValue: NodecosmosError }
>(
    'inputOutputs/delete',
    async (payload: InputOutputPrimaryKey) => {
        const {
            rootId, nodeId, branchId, id,
        } = payload;

        const response = await nodecosmos.delete(
            `input_outputs/${rootId}/${nodeId}/${branchId}/${id}`,
        );

        return response.data;
    },
);
