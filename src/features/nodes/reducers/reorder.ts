import { NodeState, ReorderPayload } from '../nodes.types';
import { buildTree } from '../tree';
import { PayloadAction } from '@reduxjs/toolkit';

export default function reorder(state: NodeState, action: PayloadAction<ReorderPayload>) {
    const {
        branchId,
        id,
        newParentId,
        newSiblingIndexAfterMove,
    } = action.payload;
    const node = state.byBranchId[branchId][id];
    const oldParentId = node.parentId;
    const oldIndex = state.childIds[branchId][oldParentId].indexOf(id);

    if (oldParentId === newParentId && newSiblingIndexAfterMove === oldIndex) return;

    state.byBranchId[branchId][id].parentId = newParentId;

    state.childIds[branchId][oldParentId].splice(oldIndex, 1);
    state.childIds[branchId][newParentId].splice(newSiblingIndexAfterMove, 0, id);

    buildTree(state, branchId, node.rootId);
}
