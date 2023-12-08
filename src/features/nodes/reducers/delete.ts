import { UUID } from '../../../types';
import { deleteNode } from '../nodes.thunks';
import { NodeState, PKWithTreeBranch } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export function deleteFromState(state: NodeState, action: PayloadAction<PKWithTreeBranch>) {
    const { treeBranchId, id } = action.payload;

    deleteNodeFromState(state, treeBranchId, id);
}

export function deleteFulfilled(state: NodeState, action: ReturnType<typeof deleteNode.fulfilled>) {
    const { id } = action.payload;
    const { treeBranchId } = action.meta.arg;

    deleteNodeFromState(state, treeBranchId, id);
}

function deleteNodeFromState(state: NodeState, treeBranchId: UUID, id: UUID) {
    const node = state.byBranchId[treeBranchId][id];
    const parent = state.byBranchId[treeBranchId][node.parentId];

    // remove from parent
    if (parent) {
        const childIds = parent.childIds.filter((childId) => childId !== id);

        parent.childIds = childIds;
        state.childIds[treeBranchId][node.parentId] = childIds;
    }

    if (state.selected?.id === id) {
        state.selected = null;
    }

    // remove from state
    delete state.childIds[treeBranchId][id];
    delete state.titles[treeBranchId][id];
    delete state.indexNodesById[id];
    // delete state.byBranchId[treeBranchId][id];
}
