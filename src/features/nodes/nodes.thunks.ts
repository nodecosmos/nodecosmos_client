import {
    IndexNodesPayload,
    NodePayload,
    NodePrimaryKey,
    NodeDescendant,
    Node,
    IndexNode,
    ReorderPayload,
} from './nodes.types';
import nodecosmos from '../../apis/nodecosmos-server';
import { NodecosmosError, UUID } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const indexNodes = createAsyncThunk<IndexNode[], IndexNodesPayload, { rejectValue: NodecosmosError }>(
    'nodes/indexNodes',
    async (payload) => {
        const response = await nodecosmos.get('/nodes', { params: payload });

        return response.data;
    },
);

interface ShowNodeResponse {
    node: Node;
    descendants: NodeDescendant[];
}

export const showNode = createAsyncThunk<ShowNodeResponse, UUID, { rejectValue: NodecosmosError }>(
    'nodes/showNode',
    async (id): Promise<{node: Node, descendants: NodeDescendant[]}> => {
        const response = await nodecosmos.get(`/nodes/${id}`);

        return response.data;
    },
);

interface NodeCreationPayload {
    treeBranchId?: UUID;
    tmpNodeId?: UUID;
    branchId?: UUID;
    parentId?: UUID;
    title: string;
    isPublic: boolean;
    isRoot: boolean;
    order: number;
}

export const createNode = createAsyncThunk<Node, NodeCreationPayload, { rejectValue: NodecosmosError }>(
    'nodes/createNode',
    async (payload) => {
        const response = await nodecosmos.post('/nodes', payload);

        return response.data;
    },
);

export const updateNodeTitle = createAsyncThunk<NodePayload, NodePayload, { rejectValue: NodecosmosError }>(
    'nodes/updateNodeTitle',
    async (payload) => {
        const response = await nodecosmos.put('/nodes/title', payload);

        return response.data;
    },
);

export const updateNodeDescription = createAsyncThunk<NodePayload, NodePayload, { rejectValue: NodecosmosError }>(
    'nodes/updateNodeDescription',
    async (payload) => {
        const response = await nodecosmos.put('/nodes/description', payload);

        return response.data;
    },
);

export const deleteNode = createAsyncThunk<Node, NodePrimaryKey, { rejectValue: NodecosmosError }>(
    'nodes/deleteNode',
    async ({ branchId, id }) => {
        const response = await nodecosmos.delete(`/nodes/${id}/${branchId}`);

        return response.data;
    },
);

export const getNodeDescription = createAsyncThunk<NodePayload, NodePrimaryKey, { rejectValue: NodecosmosError }>(
    'nodes/getNodeDescription',
    async ({ branchId, id }) => {
        const response = await nodecosmos.get(`/nodes/${id}/${branchId}/description`);

        return response.data;
    },
);

export const getNodeDescriptionBase64 = createAsyncThunk<NodePayload, NodePrimaryKey, { rejectValue: NodecosmosError }>(
    'nodes/getNodeDescriptionBase64',

    async ({ branchId, id }) => {
        const response = await nodecosmos.get(`/nodes/${id}/${branchId}/description_base64`);

        return response.data;
    },
);

export const reorder = createAsyncThunk<null, ReorderPayload, { rejectValue: NodecosmosError }>(
    'nodes/reorder',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/nodes/reorder', payload);

            return response.data;
        } catch (error) {
            return rejectWithValue(error as NodecosmosError);
        }
    },
);

export const deleteNodeImage = createAsyncThunk<null, NodePrimaryKey, { rejectValue: NodecosmosError }>(
    'nodes/deleteNodeImage',
    async ({ branchId, id }: NodePrimaryKey) => {
        const response = await nodecosmos.delete(`/nodes/${id}/${branchId}/delete_cover_image`);

        return response.data;
    },
);
