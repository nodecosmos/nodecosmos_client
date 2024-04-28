import { UUID } from '../../../types';
import { deleteNode } from '../nodes.thunks';
import { NodeState, PKWithCurrentBranch } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export function deleteFromState(state: NodeState, action: PayloadAction<PKWithCurrentBranch>) {
    const { branchId, id } = action.payload;

    deleteNodeFromState(state, branchId, id);
}

export function deleteFulfilled(state: NodeState, action: ReturnType<typeof deleteNode.fulfilled>) {
    const { data, metadata } = action.payload;
    const { id } = data;
    const { branchId } = data;

    if (metadata.deleteFromState) {
        deleteNodeFromState(state, branchId, id);
    }
}

function deleteNodeFromState(state: NodeState, branchId: UUID, id: UUID) {
    const node = state.byBranchId[branchId][id];
    const parent = state.byBranchId[branchId][node.parentId];

    // remove from parent
    if (parent) {
        const childIds = parent.childIds.filter((childId) => childId !== id);

        parent.childIds = childIds;
        state.childIds[branchId][node.parentId] = childIds;
    }

    if (state.selected?.id === id) {
        state.selected = null;
    }

    // remove from state
    delete state.childIds[branchId][id];
    delete state.titles[branchId][id];
    delete state.indexNodesById[id];
    // delete state.byBranchId[branchId][id];
}
