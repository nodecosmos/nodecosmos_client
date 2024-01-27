import { Branch, BranchParams } from './branches.types';
import nodecosmos from '../../api/nodecosmos-server';
import { RootState } from '../../store';
import { NodecosmosError, UUID } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

interface RestoreNodePayload {
    branchId: UUID;
    nodeId: UUID;
}

export const restoreNode = createAsyncThunk<Branch, RestoreNodePayload, { rejectValue: NodecosmosError }>(
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

export const checkDeletedAncestorConflict = createAsyncThunk<
    Set<UUID> | null,
    BranchParams,
    { state: RootState }
> (
    'branches/checkConflict',
    async (payload, { getState }) => {
        if (payload.mainBranchId === payload.branchId) {
            return null;
        }
        const state = getState();
        const nodes = state.nodes.byBranchId;
        const branch = state.branches.byId[payload.branchId];
        const mainNodes = nodes[payload.mainBranchId];
        const branchNodes = nodes[payload.branchId];
        let deletedAncestorIds = null;

        if (branch.createdNodes) {
            for (const id of branch.createdNodes) {
                const branchNode = branchNodes[id];

                for (const ancestorId of branchNode.ancestorIds) {
                    if (!mainNodes[ancestorId] && !branch.restoredNodes.has(ancestorId)) {
                        if (!deletedAncestorIds) {
                            deletedAncestorIds = new Set<UUID>();
                        }
                        deletedAncestorIds.add(ancestorId);
                    }
                }
            }
        }

        return deletedAncestorIds;
    },
);
