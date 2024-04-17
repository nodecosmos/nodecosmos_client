import { UUID } from '../../../types';
import { NodeId, NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export interface SearchNodePayload {
    currentBranchId: UUID;
    value: string;
}

export default function search(state: NodeState, action: PayloadAction<SearchNodePayload>) {
    const { currentBranchId, value } = action.payload;

    if (value) {
        // search by title
        const branchChildIds: Record<NodeId, UUID[]> = {};
        const childIdsByParent: Record<NodeId, Set<UUID>> = {};

        for (const nodeId in state.byBranchId[currentBranchId]) {
            const node = state.byBranchId[currentBranchId][nodeId];

            if (!node.isTmp && node.title.toLowerCase().includes(value.toLowerCase())) {
                branchChildIds[nodeId] ||= [];
                let currentNodeId = nodeId;
                let { parentId } = state.byBranchId[currentBranchId][nodeId];

                while (parentId) {
                    const parent = state.byBranchId[currentBranchId][parentId];
                    if (parent) {
                        childIdsByParent[parentId] ||= new Set();
                        childIdsByParent[parentId].add(currentNodeId);

                        currentNodeId = parentId;
                        parentId = state.byBranchId[currentBranchId][parentId].parentId;
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

        state.childIds[currentBranchId] = branchChildIds;
    } else {
        for (const nodeId in state.byBranchId[currentBranchId]) {
            state.childIds[currentBranchId][nodeId] = state.byBranchId[currentBranchId][nodeId].childIds;
        }
    }
}
