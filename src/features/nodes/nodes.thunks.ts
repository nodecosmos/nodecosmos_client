import { Node, NodePrimaryKey } from './types';
import nodecosmos from '../../apis/nodecosmos-server';
import { LIKE_TYPES } from '../app/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

// TODO: Add types for payload & response

export interface IndexNodesPayload {
    q: string;
    page?: number;
}

export const indexNodes = createAsyncThunk(
    'nodes/indexNodes',
    async (payload: IndexNodesPayload) => {
        const response = await nodecosmos.get('/nodes', { params: payload });
        return response.data;
    },
);

export const showNode = createAsyncThunk(
    'nodes/showNode',
    async (id) => {
        const response = await nodecosmos.get(`/nodes/${id}`);

        return response.data;
    },
);

// For now thunks are handled automatically by extraReducers in nodesSlice and treesSlice.
// Rethink this approach as it may be too implicit.
export const createNode = createAsyncThunk(
    'nodes/createNode',
    async (payload) => {
        const response = await nodecosmos.post('/nodes', payload);

        return response.data;
    },
);

export const updateNodeTitle = createAsyncThunk(
    'nodes/updateNodeTitle',
    async (payload) => {
        const response = await nodecosmos.put('/nodes/title', payload);
        return response.data;
    },
);

export const updateNodeDescription = createAsyncThunk(
    'nodes/updateNodeDescription',
    async (payload: Partial<Node>) => {
        try {
            const response = await nodecosmos.put('/nodes/description', payload);

            return response.data;
        } catch (error) {
            return error;
        }
    },
);

export const updateNode = createAsyncThunk(
    'nodes/updateNode',
    async (payload: NodePrimaryKey) => {
        const { id } = payload;
        const response = await nodecosmos.put(`/nodes/${id}.json`, payload);

        return response.data;
    },
);

export interface DeleteNodePayload {
    nodeId: string;
    treeNodeId: string;
}

export const deleteNode = createAsyncThunk(
    'nodes/deleteNode',
    async ({ nodeId, treeNodeId }: DeleteNodePayload) => {
        const response = await nodecosmos.delete(`/nodes/${nodeId}`);

        return {
            ...response.data,
            nodeId,
            treeNodeId,
        };
    },
);

export const getNodeDescription = createAsyncThunk(
    'nodes/getNodeDescription',
    async (id) => {
        const response = await nodecosmos.get(`/nodes/${id}/description`);

        return response.data;
    },
);

export const getNodeDescriptionBase64 = createAsyncThunk(
    'nodes/getNodeDescriptionBase64',

    async (id) => {
        const response = await nodecosmos.get(`/nodes/${id}/description_base64`);

        return response.data;
    },
);

export const getLikesCount = createAsyncThunk(
    'nodes/getLikesCount',
    async (payload) => {
        const response = await nodecosmos.get(`/likes/${payload}`);

        return response.data;
    },
);

export const likeNode = createAsyncThunk(
    'nodes/likeNode',
    async (payload) => {
        const response = await nodecosmos.post('/likes', {
            object_type: LIKE_TYPES.node,
            object_id: payload,
        });

        return response.data;
    },
);

export const unlikeNode = createAsyncThunk(
    'nodes/unlikeNode',
    async (payload) => {
        const response = await nodecosmos.delete(`/likes/${payload}`);

        return response.data;
    },
);

export const reorder = createAsyncThunk(
    'nodes/reorder',
    async (payload) => {
        const response = await nodecosmos.put('/nodes/reorder', payload);

        return response.data;
    },
);

export const deleteNodeImage = createAsyncThunk(
    'nodes/deleteNodeImage',
    async (id) => {
        const response = await nodecosmos.delete(`/nodes/${id}/delete_cover_image`);

        return response.data;
    },
);
