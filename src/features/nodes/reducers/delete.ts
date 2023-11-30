import { calculatePositions } from './tree';
import { UUID } from '../../../types';
import { deleteNode } from '../nodes.thunks';
import { NodeState, PKWithTreeBranch } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export function deleteFromState(state: NodeState, action: PayloadAction<PKWithTreeBranch>) {
    const { treeBranchId, id } = action.payload;

    deleteNodeFromState(state, treeBranchId, id);
    calculatePositions(state, treeBranchId);
}

export function deleteFulfilled(state: NodeState, action: ReturnType<typeof deleteNode.fulfilled>) {
    const { id } = action.payload;
    const { treeBranchId } = action.meta.arg;

    deleteNodeFromState(state, treeBranchId, id);
    calculatePositions(state, treeBranchId);
}

function deleteNodeFromState(state: NodeState, branchId: UUID, id: UUID) {
    const node = state.byBranchId[branchId][id];
    const parent = state.byBranchId[branchId][node.parentId];
    const descendantIds = node.descendantIds;
    const nodeIdsToDelete = [id, ...descendantIds];
    const nodeIdsToDeleteSet = new Set(nodeIdsToDelete);

    // remove from parent
    if (parent) {
        const newChildIds = parent.childIds.filter((childId) => childId !== id);

        parent.childIds = newChildIds;
        state.childIds[branchId][node.parentId] = newChildIds;

        if (parent.lastChildId === id) {
            parent.lastChildId = node.upperSiblingId;
        }
    }

    // remove node and descendants from ancestors
    node.ancestorIds.forEach((ancestorId) => {
        const ancestor = state.byBranchId[branchId][ancestorId];

        if (ancestor) {
            ancestor.descendantIds = ancestor.descendantIds.filter((descId) => !nodeIdsToDeleteSet.has(descId));
        }
    });

    // update upper sibling of bottom sibling & vice versa
    if (node.upperSiblingId) {
        const upperSibling = state.byBranchId[branchId][node.upperSiblingId];

        if (upperSibling) {
            upperSibling.lowerSiblingId = node.lowerSiblingId;
        }
    }

    if (node.lowerSiblingId) {
        const lowerSibling = state.byBranchId[branchId][node.lowerSiblingId];

        if (lowerSibling) {
            lowerSibling.upperSiblingId = node.upperSiblingId;
        }
    }

    if (state.selected?.id === id) {
        state.selected = null;
    }

    state.orderedTreeIds[branchId] = state.orderedTreeIds[branchId].filter((id) => !nodeIdsToDeleteSet.has(id));

    nodeIdsToDelete.forEach((nodeId: UUID) => {
        delete state.childIds[branchId][id];
        delete state.indexNodesById[nodeId];
        delete state.byBranchId[branchId][nodeId];
    });
}
