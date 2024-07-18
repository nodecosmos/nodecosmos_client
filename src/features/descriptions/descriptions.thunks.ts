import { Description, QueryKey } from './descriptions.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError } from '../../types';
import { BranchDiffPayload } from '../branch/branches.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const getDescription = createAsyncThunk<Description, QueryKey, { rejectValue: NodecosmosError }>(
    'descriptions/getDescription',
    async ({
        branchId, objectId, nodeId, objectType, rootId,
    }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(
                `/descriptions/${branchId}/${objectId}/${rootId}/${objectType}/${nodeId}/base`,
            );

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while fetching the description.',
                viewMessage: true,
            });
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
        branchId, objectId, nodeId, objectType, rootId,
    }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(
                `/descriptions/${branchId}/${objectId}/${rootId}/${objectType}/${nodeId}/base64`,
            );

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while fetching the description.',
                viewMessage: true,
            });
        }
    },
);

export const getOriginalDescription = createAsyncThunk<
    Omit<Description, 'base64'>,
    QueryKey & BranchDiffPayload,
    { rejectValue: NodecosmosError }
> (
    'descriptions/getOriginalDescription',
    async ({
        branchId, objectId, nodeId, objectType, rootId,
    }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(
                `/descriptions/${branchId}/${objectId}/${rootId}/${objectType}/${nodeId}/original_base64`,
            );

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while fetching the original description.',
                viewMessage: true,
            });
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

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while saving the description.',
                viewMessage: true,
            });
        }
    },
);
