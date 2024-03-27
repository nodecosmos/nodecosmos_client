import { Description, PrimaryKey } from './descriptions.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError, WithNodeId } from '../../types';
import { BranchDiffPayload } from '../branch/branches.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const getDescription = createAsyncThunk<Description, WithNodeId<PrimaryKey>, { rejectValue: NodecosmosError }>(
    'descriptions/getDescription',
    async ({
        branchId, objectId, nodeId,
    }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/descriptions/${nodeId}/${objectId}/${branchId}`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const getDescriptionBase64 = createAsyncThunk<
    Description,
    WithNodeId<PrimaryKey>,
    { rejectValue: NodecosmosError }
>(
    'descriptions/getDescriptionBase64',

    async ({
        branchId, objectId, nodeId,
    }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/descriptions/${nodeId}/${objectId}/${branchId}/base64`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const getOriginalDescription = createAsyncThunk<
    Omit<Description, 'base64'>,
    WithNodeId<BranchDiffPayload>,
    { rejectValue: NodecosmosError }
> (
    'descriptions/getOriginalDescription',
    async ({ objectId, nodeId }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/descriptions/${nodeId}/${objectId}/original/base64`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const saveDescription = createAsyncThunk<
    Description,
    Description,
    { rejectValue: NodecosmosError }
>(
    'descriptions/saveDescription',
    async (description, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.post('/descriptions', description);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);
