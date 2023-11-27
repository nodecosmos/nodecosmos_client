import {
    IndexNodesPayload,
    NodeCreationPayload,
    NodePayload,
    NodePrimaryKey,
    NodeDescendant,
    Node,
    IndexNode,
    ReorderPayload,
} from './nodes.types';
import nodecosmos from '../../apis/nodecosmos-server';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const indexNodes = createAsyncThunk(
    'nodes/indexNodes',
    async (payload: IndexNodesPayload): Promise<IndexNode[]> => {
        const response = await nodecosmos.get('/nodes', { params: payload });

        return response.data;
    },
);

export const showNode = createAsyncThunk(
    'nodes/showNode',
    async (id): Promise<{node: Node, descendants: NodeDescendant[]}> => {
        const response = await nodecosmos.get(`/nodes/${id}`);

        return response.data;
    },
);

export const createNode = createAsyncThunk(
    'nodes/createNode',
    async (payload: NodeCreationPayload): Promise<Node> => {
        const response = await nodecosmos.post('/nodes', payload);

        return response.data;
    },
);

export const updateNodeTitle = createAsyncThunk(
    'nodes/updateNodeTitle',
    async (payload: NodePayload): Promise<NodePayload> => {
        const response = await nodecosmos.put('/nodes/title', payload);

        return response.data;
    },
);

export const updateNodeDescription = createAsyncThunk(
    'nodes/updateNodeDescription',
    async (payload: NodePayload): Promise<NodePayload> => {
        const response = await nodecosmos.put('/nodes/description', payload);

        return response.data;
    },
);

export const deleteNode = createAsyncThunk(
    'nodes/deleteNode',
    async ({ branchId, id }: NodePrimaryKey): Promise<Node> => {
        const response = await nodecosmos.delete(`/nodes/${id}/${branchId}`);

        return response.data;
    },
);

export const getNodeDescription = createAsyncThunk(
    'nodes/getNodeDescription',
    async ({ branchId, id }: NodePrimaryKey): Promise<NodePayload> => {
        const response = await nodecosmos.get(`/nodes/${id}/${branchId}/description`);

        return response.data;
    },
);

export const getNodeDescriptionBase64 = createAsyncThunk(
    'nodes/getNodeDescriptionBase64',

    async ({ branchId, id }: NodePrimaryKey): Promise<NodePayload> => {
        const response = await nodecosmos.get(`/nodes/${id}/${branchId}/description_base64`);

        return response.data;
    },
);

export const reorder = createAsyncThunk(
    'nodes/reorder',
    async (payload: ReorderPayload) => {
        const response = await nodecosmos.put('/nodes/reorder', payload);

        return response.data;
    },
);

export const deleteNodeImage = createAsyncThunk(
    'nodes/deleteNodeImage',
    async ({ branchId, id }: NodePrimaryKey) => {
        const response = await nodecosmos.delete(`/nodes/${id}/${branchId}/delete_cover_image`);

        return response.data;
    },
);
