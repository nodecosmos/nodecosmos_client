import { Branch } from './branches.types';
import nodecosmos from '../../api/nodecosmos-server';
import { RootState } from '../../store';
import { NodecosmosError, UUID } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

// We use this to fetch latest conflict information for a branch.
export const reloadBranch = createAsyncThunk<Branch, UUID, { rejectValue: NodecosmosError, state: RootState }>(
    'branches/reload',
    async (branchId, { rejectWithValue, getState }) => {
        const state = getState();
        const branch = state.branches.byId[branchId];

        // we only check for conflicts if the branch is already in conflict
        if (!branch.conflict) {
            return branch;
        }

        try {
            const response = await nodecosmos.get(`/branches/${branchId}`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const showBranch = createAsyncThunk<Branch, UUID, { rejectValue: NodecosmosError }>(
    'branches/showBranch',
    async (branchId, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.get(`/branches/${branchId}`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

interface BranchPayload {
    branchId: UUID;
    objectId: UUID;
}

export const restoreNode = createAsyncThunk<Branch, BranchPayload, { rejectValue: NodecosmosError }>(
    'branches/restoreNode',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/branches/restore_node', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const undoDeleteNode = createAsyncThunk<Branch, BranchPayload, { rejectValue: NodecosmosError }>(
    'branches/undoDeleteNode',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/branches/undo_delete_node', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const restoreFlow = createAsyncThunk<Branch, BranchPayload, { rejectValue: NodecosmosError }>(
    'branches/restoreFlow',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/branches/restore_flow', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const undoDeleteFlow = createAsyncThunk<Branch, BranchPayload, { rejectValue: NodecosmosError }>(
    'branches/undoDeleteFlow',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/branches/undo_delete_flow', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const restoreFlowStep = createAsyncThunk<Branch, BranchPayload, { rejectValue: NodecosmosError }>(
    'branches/restoreFlowStep',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/branches/restore_flow_step', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const undoDeleteFlowStep = createAsyncThunk<Branch, BranchPayload, { rejectValue: NodecosmosError }>(
    'branches/undoDeleteFlowStep',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/branches/undo_delete_flow_step', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const keepFlowStep = createAsyncThunk<Branch, BranchPayload, { rejectValue: NodecosmosError }>(
    'branches/keepFlowStep',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/branches/keep_flow_step', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);

export const restoreIo = createAsyncThunk<Branch, BranchPayload, { rejectValue: NodecosmosError }>(
    'branches/restoreIo',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.put('/branches/restore_io', payload);

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);
// #[put("/undo_delete_flow_step_io/{branch_id}/{fs_id}/{fs_node_id}/{io_id}")]
// #[put("/undo_delete_initial_io/{branch_id}/{io_id}")]
export const undoDeleteIo = createAsyncThunk<Branch, {
    branchId: UUID;
    flowStepId?: UUID | null;
    flowStepNodeId?: UUID | null;
    id: UUID;
}, { rejectValue: NodecosmosError }>(
    'branches/undoDeleteIo',
    async ({
        branchId,
        flowStepId = '',
        flowStepNodeId = '',
        id,
    }, { rejectWithValue }) => {
        try {
            let response;
            if (flowStepNodeId && flowStepId) {
                response = await nodecosmos.put(
                    `/branches/undo_delete_flow_step_io/${branchId}/${flowStepId}/${flowStepNodeId}/${id}`,
                );
            } else {
                response = await nodecosmos.put(
                    `/branches/undo_delete_initial_io/${branchId}/${id}`,
                );
            }

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);
        }
    },
);
