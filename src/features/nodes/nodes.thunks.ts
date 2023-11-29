import {
    IndexNodesPayload,
    NodePayload,
    NodePrimaryKey,
    NodeDescendant,
    Node,
    IndexNode,
    ReorderPayload,
    PKWithTreeBranch,
} from './nodes.types';
import nodecosmos from '../../apis/nodecosmos-server';
import { NodecosmosError, UUID } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

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

export interface NodeCreationPayload {
    treeBranchId?: UUID;
    tmpNodeId?: UUID;
    branchId?: UUID; // we provide branch only when creating a node for non-main branch e.g. for contribution request
    parentId?: UUID;
    title: string;
    isPublic: boolean;
    isRoot: boolean;
    order: number;
}

export const create = createAsyncThunk<Node, NodeCreationPayload, { rejectValue: NodecosmosError }>(
    'nodes/create',
    async (payload) => {
        const response = await nodecosmos.post('/nodes', payload);

        return response.data;
    },
);

export const updateTitle = createAsyncThunk<NodePayload, NodePayload, { rejectValue: NodecosmosError }>(
    'nodes/updateTitle',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/nodes/title', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                // Handle the error using rejectWithValue
                return rejectWithValue(error.response.data); // This passes the server response to the rejected action
            }

            console.error(error);
        }
    },
);

export const updateDescription = createAsyncThunk<NodePayload, NodePayload, { rejectValue: NodecosmosError }>(
    'nodes/updateDescription',
    async (payload) => {
        const response = await nodecosmos.put('/nodes/description', payload);

        return response.data;
    },
);

export const deleteNode = createAsyncThunk<Node, PKWithTreeBranch, { rejectValue: NodecosmosError }>(
    'nodes/deleteNode',
    async ({ branchId, id }) => {
        const response = await nodecosmos.delete(`/nodes/${id}/${branchId}`);

        return response.data;
    },
);

export const getDescription = createAsyncThunk<NodePayload, PKWithTreeBranch, { rejectValue: NodecosmosError }>(
    'nodes/getDescription',
    async ({ branchId, id }) => {
        const response = await nodecosmos.get(`/nodes/${id}/${branchId}/description`);

        return response.data;
    },
);

export const getDescriptionBase64 = createAsyncThunk<NodePayload, PKWithTreeBranch, { rejectValue: NodecosmosError }>(
    'nodes/getDescriptionBase64',

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
