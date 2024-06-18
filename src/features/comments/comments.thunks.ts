import {
    Comment, CreateCommentPayload, CommentPrimaryKey, CommentThread, UpdateCommentPayload, UpdateCommentContentResponse,
} from './comments.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError, UUID } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

interface IndexThreadsPayload {
    branchId: UUID;
    objectId: UUID;
}

export const indexThreads = createAsyncThunk<
    CommentThread[],
    IndexThreadsPayload,
    { rejectValue: NodecosmosError }
>(
    'comments/indexThreads',
    async ({ branchId, objectId }) => {
        const response = await nodecosmos.get(`/comments/threads/${branchId}/${objectId}`);
        return response.data;
    },
);

interface IndexCommentsPayload {
    branchId: UUID;
    threadId: UUID;
}

export const indexComments = createAsyncThunk<
    Comment[],
    IndexCommentsPayload,
    { rejectValue: NodecosmosError }
>(
    'comments/indexComments',
    async ({ branchId, threadId }) => {
        const response = await nodecosmos.get(`/comments/${branchId}/${threadId}`);
        return response.data;
    },
);

export interface CreateCommentResponse {
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
    UpdateCommentContentResponse,
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
