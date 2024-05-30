import {
    IndexNodesPayload,
    NodePrimaryKey,
    NodeDescendant,
    Node,
    IndexNode,
    UpdateTitlePayload,
} from './nodes.types';
import nodecosmos from '../../api/nodecosmos-server';
import { RootState } from '../../store';
import {
    NodecosmosError, RootId, UUID,
} from '../../types';
import { BranchMetadata, WithBranchMetadata } from '../branch/branches.types';
import { ShowUser } from '../users/users.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const indexNodes = createAsyncThunk<IndexNode[], IndexNodesPayload | null, { rejectValue: NodecosmosError }>(
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

// shows original node with original descendants
export const showNode = createAsyncThunk<ShowNodeResponse, NodePrimaryKey, { rejectValue: NodecosmosError }>(
    'nodes/showNode',
    async ({ branchId, id }): Promise<{node: Node, descendants: NodeDescendant[]}> => {
        const response = await nodecosmos.get(`/nodes/${branchId}/${id}/original`);

        return response.data;
    },
);

// shows branch node + branch descendants + original descendants
export const showBranchNode = createAsyncThunk<
    ShowNodeResponse,
    NodePrimaryKey & {originalId?: UUID | null},
    { rejectValue: NodecosmosError }
>(
    'nodes/showBranchNode',
    async ({
        branchId, id, originalId,
    }): Promise<{node: Node, descendants: NodeDescendant[]}> => {
        let path = `/nodes/${branchId}/${id}/branch`;

        if (originalId) {
            path += `?originalId=${originalId}`;
        }

        const response = await nodecosmos.get(path);

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
    orderIndex: number;
}

export interface NodeCreationPayload extends NodeCreationApiPayload {
    branchId?: UUID;
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

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while creating the node.',
                viewMessage: true,
            });
        }
    },
);

export const updateTitle = createAsyncThunk<UpdateTitlePayload, UpdateTitlePayload, { rejectValue: NodecosmosError }>(
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

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while updating the node title.',
                viewMessage: true,
            });
        }
    },
);

export const deleteNode = createAsyncThunk<
    WithBranchMetadata<Node>,
    NodePrimaryKey & RootId,
    { state: RootState, rejectValue: NodecosmosError }
>(
    'nodes/deleteNode',
    async ({
        branchId, id, rootId,
    }, { rejectWithValue, getState }) => {
        try {
            const response = await nodecosmos.delete(`/nodes/${branchId}/${id}/${rootId}`);
            const metadata: BranchMetadata = {};
            const state = getState();
            const branch = state.branches.byId[branchId];

            if (branch) {
                metadata.deleteFromState = branch.createdNodes.has(id) || branch.restoredNodes.has(id);
            } else {
                metadata.deleteFromState = true;
            }

            return {
                data: response.data,
                metadata,
            };
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while deleting the node.',
                viewMessage: true,
            });
        }
    },
);

export interface ReorderPayload {
    rootId: UUID;
    branchId: UUID;
    id: UUID;
    newParentId: UUID;
    newUpperSiblingId?: UUID;
    newLowerSiblingId?: UUID;
    oldParentId: UUID;
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

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while reordering the node.',
                viewMessage: true,
            });
        }
    },
);

export const deleteNodeImage = createAsyncThunk<null, NodePrimaryKey & RootId, { rejectValue: NodecosmosError }>(
    'nodes/deleteNodeImage',
    async ({
        branchId, id, rootId,
    }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.delete(`/nodes/${branchId}/${id}/${rootId}/delete_cover_image`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while deleting the node image.',
                viewMessage: true,
            });
        }
    },
);

export const getEditors = createAsyncThunk<ShowUser[], NodePrimaryKey, { rejectValue: NodecosmosError }>(
    'nodes/getEditors',
    async ({ branchId, id }, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/nodes/${branchId}/${id}/editors`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while getting the editors.',
                viewMessage: true,
            });
        }
    },
);
