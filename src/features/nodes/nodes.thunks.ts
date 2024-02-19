import {
    IndexNodesPayload,
    NodePayload,
    NodePrimaryKey,
    NodeDescendant,
    Node,
    IndexNode,
    PKWithTreeBranch, UpdateTitlePayload, UpdateDescriptionPayload,
} from './nodes.types';
import nodecosmos from '../../api/nodecosmos-server';
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

export const showBranchNode = createAsyncThunk<ShowNodeResponse, NodePrimaryKey, { rejectValue: NodecosmosError }>(
    'nodes/showBranchNode',
    async ({ branchId, id }): Promise<{node: Node, descendants: NodeDescendant[]}> => {
        const response = await nodecosmos.get(`/nodes/${id}/${branchId}`);

        return response.data;
    },
);

export interface NodeCreationApiPayload {
    branchId?: UUID;
    parentId?: UUID;
    rootId?: UUID;
    title: string;
    isPublic: boolean;
    isRoot: boolean;
    order: number;
}

export interface NodeCreationPayload extends NodeCreationApiPayload {
    treeBranchId?: UUID;
    tmpId?: UUID;
}

export const create = createAsyncThunk<Node, NodeCreationPayload, { rejectValue: NodecosmosError }>(
    'nodes/create',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.post('/nodes', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const updateTitle = createAsyncThunk<NodePayload, UpdateTitlePayload, { rejectValue: NodecosmosError }>(
    'nodes/updateTitle',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/nodes/title', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const updateDescription = createAsyncThunk<
    NodePayload,
    UpdateDescriptionPayload,
    { rejectValue: NodecosmosError }
>(
    'nodes/updateDescription',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/nodes/description', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const deleteNode = createAsyncThunk<Node, PKWithTreeBranch, { rejectValue: NodecosmosError }>(
    'nodes/deleteNode',
    async ({ branchId, id }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.delete(`/nodes/${id}/${branchId}`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const getDescription = createAsyncThunk<NodePayload, PKWithTreeBranch, { rejectValue: NodecosmosError }>(
    'nodes/getDescription',
    async ({ branchId, id }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/nodes/${id}/${branchId}/description`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const getDescriptionBase64 = createAsyncThunk<NodePayload, PKWithTreeBranch, { rejectValue: NodecosmosError }>(
    'nodes/getDescriptionBase64',

    async ({ branchId, id }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/nodes/${id}/${branchId}/description_base64`);

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
    NodePayload,
    PKWithTreeBranch,
    { rejectValue: NodecosmosError }
> (
    'nodes/getOriginalDescription',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/nodes/${id}/original/description`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export interface ReorderPayload {
    id: UUID;
    branchId: UUID;
    treeBranchId: UUID;
    newParentId: UUID;
    newUpperSiblingId?: UUID;
    newLowerSiblingId?: UUID;
    newSiblingIndexAfterMove: number;
}

export const reorder = createAsyncThunk<null, ReorderPayload, { rejectValue: NodecosmosError }>(
    'nodes/reorder',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/nodes/reorder', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const deleteNodeImage = createAsyncThunk<null, NodePrimaryKey, { rejectValue: NodecosmosError }>(
    'nodes/deleteNodeImage',
    async ({ branchId, id }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.delete(`/nodes/${id}/${branchId}/delete_cover_image`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);
