import {
    Comment, CreateCommentPayload, CommentPrimaryKey, CommentThread, UpdateCommentPayload,
} from './comments.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError, UUID } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

interface IndexCommentsResponse {
    comments: Comment[];
    threads: CommentThread[];
}

export const indexComments = createAsyncThunk<
    IndexCommentsResponse,
    UUID,
    { rejectValue: NodecosmosError }
>(
    'comments/indexComments',
    async (objectId) => {
        const response = await nodecosmos.get(`/comments/${objectId}`);
        return response.data;
    },
);

interface CreateCommentResponse {
    comment: Comment,
    thread?: CommentThread,
}

export const createComment = createAsyncThunk<
    CreateCommentResponse,
    CreateCommentPayload,
    { rejectValue: NodecosmosError }
>(
    'comments/createComment',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.post('/comments', payload);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            console.error(error);
        }
    },
);

export const updateCommentContent = createAsyncThunk<
    UpdateCommentPayload,
    UpdateCommentPayload,
    { rejectValue: NodecosmosError }
>(
    'comments/updateCommentContent',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/comments/content', payload);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            console.error(error);
        }
    },
);

export const deleteComment = createAsyncThunk<void, CommentPrimaryKey, { rejectValue: NodecosmosError }>(
    'comments/deleteComment',
    async ({
        objectId, threadId, id,
    }, { rejectWithValue }) => {
        try {
            await nodecosmos.delete(`/comments/${objectId}/${threadId}/${id}`);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            console.error(error);
        }
    },
);
