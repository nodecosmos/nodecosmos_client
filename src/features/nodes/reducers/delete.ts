import { deleteNode } from '../nodes.thunks';
import { NodePrimaryKey, NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export function deleteFromState(state: NodeState, action: PayloadAction<NodePrimaryKey>) {
    const { branchId, id } = action.payload;

    const node = state.byBranchId[branchId][id];
    const parent = state.byBranchId[branchId][node.parentId];

    delete state.childIds[branchId][id];

    // filter from childIds[branchId]
    if (parent) {
        if (state.childIds[branchId][node.parentId]) {
            state.childIds[branchId][node.parentId] = state.childIds[branchId][node.parentId].filter(
                (id) => id !== id,
            );
        }
    }

    delete state.indexNodesById[id];
    delete state.byBranchId[branchId][id];
}

export function deleteFulfilled(state: NodeState, action: ReturnType<typeof deleteNode.fulfilled>) {
    const { branchId, id } = action.payload;

    const node = state.byBranchId[branchId][id];
    const parent = state.byBranchId[branchId][node.parentId];

    delete state.childIds[branchId][id];

    // filter from childIds[branchId]
    if (parent) {
        if (state.childIds[branchId][node.parentId]) {
            state.childIds[branchId][node.parentId] = state.childIds[branchId][node.parentId].filter(
                (childId) => childId !== id,
            );
        }
    }

    delete state.indexNodesById[id];

    delete state.byBranchId[branchId][id];
}
