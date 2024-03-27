import { Description, QueryKey } from './descriptions.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError } from '../../types';
import { BranchDiffPayload } from '../branch/branches.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const getDescription = createAsyncThunk<Description, QueryKey, { rejectValue: NodecosmosError }>(
    'descriptions/getDescription',
    async ({
        branchId, objectId, nodeId, objectType,
    }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(
                `/descriptions/${nodeId}/${objectId}/${objectType}/${branchId}`,
            );

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
    QueryKey,
    { rejectValue: NodecosmosError }
>(
    'descriptions/getDescriptionBase64',

    async ({
        branchId, objectId, nodeId, objectType,
    }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(
                `/descriptions/${nodeId}/${objectId}/${objectType}/${branchId}/base64`,
            );

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
    Omit<QueryKey, 'objectType'> & BranchDiffPayload,
    { rejectValue: NodecosmosError }
> (
    'descriptions/getOriginalDescription',
    async ({ objectId, nodeId }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(
                `/descriptions/${nodeId}/${objectId}`,
            );

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
