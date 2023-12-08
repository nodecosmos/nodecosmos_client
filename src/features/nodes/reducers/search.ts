import { UUID } from '../../../types';
import { NodeId, NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export interface SearchNodePayload {
    treeBranchId: UUID;
    value: string;
}

export default function search(state: NodeState, action: PayloadAction<SearchNodePayload>) {
    const { treeBranchId, value } = action.payload;

    if (value) {
        // search by title
        const branchChildIds: Record<NodeId, UUID[]> = {};
        const childIdsByParent: Record<NodeId, Set<UUID>> = {};

        for (const nodeId in state.byBranchId[treeBranchId]) {
            const node = state.byBranchId[treeBranchId][nodeId];

            if (!node.isTmp && node.title.toLowerCase().includes(value.toLowerCase())) {
                branchChildIds[nodeId] ||= [];
                let currentNodeId = nodeId;
                let { parentId } = state.byBranchId[treeBranchId][nodeId];

                while (parentId) {
                    const parent = state.byBranchId[treeBranchId][parentId];
                    if (parent) {
                        childIdsByParent[parentId] ||= new Set();
                        childIdsByParent[parentId].add(currentNodeId);

                        currentNodeId = parentId;
                        parentId = state.byBranchId[treeBranchId][parentId].parentId;
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

        state.childIds[treeBranchId] = branchChildIds;
    } else {
        for (const nodeId in state.byBranchId[treeBranchId]) {
            state.childIds[treeBranchId][nodeId] = state.byBranchId[treeBranchId][nodeId].childIds;
        }
    }
}
