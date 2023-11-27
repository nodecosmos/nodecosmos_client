import { NodeState, SearchNodePayload } from '../nodes.types';
import { buildTree } from '../tree';
import { PayloadAction } from '@reduxjs/toolkit';

export default function search(state: NodeState, action: PayloadAction<SearchNodePayload>) {
    const {
        rootId, branchId, value,
    } = action.payload;

    if (value) {
        // search by title
        const newChildIds: NodeState['childIds'] = {};

        for (const nodeId in state.byBranchId[branchId]) {
            if (state.byBranchId[branchId][nodeId].title
                && state.byBranchId[branchId][nodeId].rootId === rootId
                && state.byBranchId[branchId][nodeId].title.toLowerCase()
                    .includes(value.toLowerCase())) {
                newChildIds[branchId][nodeId] ||= [];
                let currentNodeId = nodeId;
                let { parentId } = state.byBranchId[branchId][nodeId];

                while (parentId) {
                    if (state.byBranchId[branchId][parentId]) {
                        newChildIds[branchId][parentId] ||= [];

                        if (!newChildIds[branchId][parentId].includes(currentNodeId)) {
                            newChildIds[branchId][parentId].push(currentNodeId);
                        }

                        currentNodeId = parentId;
                        parentId = state.byBranchId[branchId][parentId].parentId;
                    } else {
                        break;
                    }
                }
            }
        }

        state.childIds = newChildIds;
    } else {
        // reset childIds[branchId]
        for (const nodeId in state.byBranchId[branchId]) {
            if (state.byBranchId[branchId][nodeId] && state.byBranchId[branchId][nodeId].rootId === rootId) {
                state.childIds[branchId][nodeId] = state.byBranchId[branchId][nodeId].childIds;
            }
        }
    }

    buildTree(state, branchId, rootId);
}
