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

    delete state.childIds[branchId][id];

    // remove from parent
    if (parent) {
        if (state.childIds[branchId][node.parentId]) {
            state.childIds[branchId][node.parentId] = state.childIds[branchId][node.parentId].filter(
                (id) => id !== id,
            );

            parent.childIds = parent.childIds.filter((childId) => childId !== id);
        }
    }

    // remove node and descendants from ancestors
    node.ancestorIds.forEach((ancestorId) => {
        const ancestor = state.byBranchId[branchId][ancestorId];

        if (ancestor) {
            ancestor.descendantIds = ancestor.descendantIds.filter((descendantId) => {
                return descendantId !== id && !descendantIds.includes(descendantId);
            });
        }
    });

    // remove from tree
    if (state.orderedTreeIds[branchId]) {
        state.orderedTreeIds[branchId] = state.orderedTreeIds[branchId].filter((treeId) => treeId !== id);
    }

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

    const nodeIdsToDelete = [id, ...descendantIds];

    nodeIdsToDelete.forEach((nodeId: UUID) => {
        delete state.indexNodesById[nodeId];
        delete state.byBranchId[branchId][nodeId];
    });
}
