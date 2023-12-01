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

function deleteNodeFromState(state: NodeState, treeBranchId: UUID, id: UUID) {
    const node = state.byBranchId[treeBranchId][id];
    const parent = state.byBranchId[treeBranchId][node.parentId];
    const descendantIds = node.descendantIds;
    const nodeIdsToDelete = [id, ...descendantIds];
    const nodeIdsToDeleteSet = new Set(nodeIdsToDelete);
    const treeIndex = node.treeIndex as number;

    // remove from parent
    if (parent) {
        const newChildIds = parent.childIds.filter((childId) => childId !== id);

        parent.childIds = newChildIds;
        state.childIds[treeBranchId][node.parentId] = newChildIds;

        if (parent.lastChildId === id) {
            parent.lastChildId = node.upperSiblingId;
        }
    }

    // remove node and descendants from ancestors
    node.ancestorIds.forEach((ancestorId) => {
        const ancestor = state.byBranchId[treeBranchId][ancestorId];

        if (ancestor) {
            ancestor.descendantIds = ancestor.descendantIds.filter((descId) => !nodeIdsToDeleteSet.has(descId));
        }
    });

    // update upper sibling of bottom sibling & vice versa
    if (node.upperSiblingId) {
        const upperSibling = state.byBranchId[treeBranchId][node.upperSiblingId];

        if (upperSibling) {
            upperSibling.lowerSiblingId = node.lowerSiblingId;
        }
    }

    if (node.lowerSiblingId) {
        const lowerSibling = state.byBranchId[treeBranchId][node.lowerSiblingId];

        if (lowerSibling) {
            lowerSibling.upperSiblingId = node.upperSiblingId;
        }
    }

    if (state.selected?.id === id) {
        state.selected = null;
    }

    state.orderedTreeIds[treeBranchId] = state.orderedTreeIds[treeBranchId].filter((id) => !nodeIdsToDeleteSet.has(id));

    // decrement indexes of subsequent nodes
    for (let i = treeIndex + 1; i < state.orderedTreeIds[treeBranchId].length; i += 1) {
        const nodeId = state.orderedTreeIds[treeBranchId][i];
        const node = state.byBranchId[treeBranchId][nodeId];

        if (node) {
            node.treeIndex = i - 1;
        }
    }

    nodeIdsToDelete.forEach((nodeId: UUID) => {
        delete state.childIds[treeBranchId][id];
        delete state.indexNodesById[nodeId];
        delete state.byBranchId[treeBranchId][nodeId];
    });
}
