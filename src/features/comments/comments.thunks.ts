import {
    Comment, CommentInsertPayload, CommentPrimaryKey, CommentThread, CommentThreadInsertPayload,
} from './comments.types';
import nodecosmos from '../../api/nodecosmos-server';
import { NodecosmosError, UUID } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

interface IndexCommentsPayload {
    objectId: UUID;
}

interface IndexCommentsResponse {
    comments: Comment[];
    threads: CommentThread[];
}

export const indexComments = createAsyncThunk<
    IndexCommentsResponse,
    IndexCommentsPayload,
    { rejectValue: NodecosmosError }
>(
    'comments/indexComments',
    async ({ objectId }) => {
        const response = await nodecosmos.get(`/comments/${objectId}`);
        return response.data;
    },
);

interface CreateCommentPayload {
    comment: CommentInsertPayload,
    thread?: CommentThreadInsertPayload,
}

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

interface UpdateCommentPayload extends CommentPrimaryKey {
    content: string;
}
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
