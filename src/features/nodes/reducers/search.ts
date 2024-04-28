import { UUID } from '../../../types';
import { NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export interface SearchNodePayload {
    branchId: UUID;
    value: string;
}

export default function search(state: NodeState, action: PayloadAction<SearchNodePayload>) {
    const { branchId, value } = action.payload;

    if (value) {
        // search by title
        const branchChildIds: Record<UUID, UUID[]> = {};
        const childIdsByParent: Record<UUID, Set<UUID>> = {};

        for (const nodeId in state.byBranchId[branchId]) {
            const node = state.byBranchId[branchId][nodeId];

            if (!node.isTmp && node.title.toLowerCase().includes(value.toLowerCase())) {
                branchChildIds[nodeId] ||= [];
                let currentNodeId = nodeId;
                let { parentId } = state.byBranchId[branchId][nodeId];

                while (parentId) {
                    const parent = state.byBranchId[branchId][parentId];
                    if (parent) {
                        childIdsByParent[parentId] ||= new Set();
                        childIdsByParent[parentId].add(currentNodeId);

                        currentNodeId = parentId;
                        parentId = state.byBranchId[branchId][parentId].parentId;
                    } else {
                        break;
                    }
                }
            }
        }

        for (const parentId in childIdsByParent) {
            branchChildIds[parentId] ||= [];

            for (const childId of childIdsByParent[parentId]) {
                branchChildIds[parentId].push(childId);
            }
        }

        state.childIds[branchId] = branchChildIds;
    } else {
        for (const nodeId in state.byBranchId[branchId]) {
            state.childIds[branchId][nodeId] = state.byBranchId[branchId][nodeId].childIds;
        }
    }
}
