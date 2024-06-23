import {
    Comment,
    CreateCommentPayload,
    CommentPrimaryKey,
    CommentThread,
    UpdateCommentPayload,
    UpdateCommentContentResponse,
    CommentThreadPrimaryKey,
} from './comments.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError, UUID } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

interface IndexThreadsPayload {
    rootId: UUID;
    branchId: UUID;
    objectId: UUID;
}

export const indexThreads = createAsyncThunk<
    CommentThread[],
    IndexThreadsPayload,
    { rejectValue: NodecosmosError }
>(
    'comments/indexThreads',
    async ({
        rootId, branchId, objectId,
    }) => {
        const response = await nodecosmos.get(`/comments/threads/${rootId}/${branchId}/${objectId}`);
        return response.data;
    },
);

interface IndexCommentsResponse {
    comments: Comment[];
    thread: CommentThread;
}

interface IndexCommentsPayload {
    rootId: UUID;
    branchId: UUID;
    objectId: UUID;
    threadId: UUID;
}

export const showThread = createAsyncThunk<
    IndexCommentsResponse,
    IndexCommentsPayload,
    { rejectValue: NodecosmosError }
>(
    'comments/showThread',
    async ({
        rootId, branchId, objectId, threadId,
    }) => {
        const response = await nodecosmos.get(`/comments/${rootId}/${branchId}/${objectId}/${threadId}`);
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

export const deleteThread = createAsyncThunk<void, CommentThreadPrimaryKey, { rejectValue: NodecosmosError }>(
    'comments/deleteThread',
    async ({
        branchId, objectId, id,
    }, { rejectWithValue }) => {
        try {
            await nodecosmos.delete(`/comments/thread/${branchId}/${objectId}/${id}`);
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
        branchId, threadId, objectId, id,
    }, { rejectWithValue }) => {
        try {
            await nodecosmos.delete(`/comments/${branchId}/${threadId}/${objectId}/${id}`);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            console.error(error);
        }
    },
);
