import { Description, PrimaryKey } from './descriptions.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError } from '../../types';
import { BranchDiffPayload } from '../branch/branches.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const getDescription = createAsyncThunk<Description, PrimaryKey, { rejectValue: NodecosmosError }>(
    'descriptions/getDescription',
    async ({ branchId, objectId }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/descriptions/${objectId}/${branchId}`);

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
    PrimaryKey,
    { rejectValue: NodecosmosError }
>(
    'descriptions/getDescriptionBase64',

    async ({ branchId, objectId }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/descriptions/${objectId}/${branchId}/base64`);

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
    BranchDiffPayload,
    { rejectValue: NodecosmosError }
> (
    'descriptions/getOriginalDescription',
    async ({ objectId }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/descriptions/${objectId}/original/base64`);

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
