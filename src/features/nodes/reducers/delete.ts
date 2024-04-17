import { UUID } from '../../../types';
import { deleteNode } from '../nodes.thunks';
import { NodeState, PKWithTreeBranch } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export function deleteFromState(state: NodeState, action: PayloadAction<PKWithTreeBranch>) {
    const { currentBranchId, id } = action.payload;

    deleteNodeFromState(state, currentBranchId, id);
}

export function deleteFulfilled(state: NodeState, action: ReturnType<typeof deleteNode.fulfilled>) {
    const { id } = action.payload;
    const { currentBranchId } = action.meta.arg;

    deleteNodeFromState(state, currentBranchId, id);
}

function deleteNodeFromState(state: NodeState, currentBranchId: UUID, id: UUID) {
    const node = state.byBranchId[currentBranchId][id];
    const parent = state.byBranchId[currentBranchId][node.parentId];

    if (node.branchId !== node.id) {
        return;
    }

    // remove from parent
    if (parent) {
        const childIds = parent.childIds.filter((childId) => childId !== id);

        parent.childIds = childIds;
        state.childIds[currentBranchId][node.parentId] = childIds;
    }

    if (state.selected?.id === id) {
        state.selected = null;
    }

    // remove from state
    delete state.childIds[currentBranchId][id];
    delete state.titles[currentBranchId][id];
    delete state.indexNodesById[id];
    // delete state.byBranchId[currentBranchId][id];
}
