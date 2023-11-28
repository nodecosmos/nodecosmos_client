import { buildTree } from './tree';
import { reorder } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function reorderFulfilled(state: NodeState, action: ReturnType<typeof reorder.fulfilled>) {
    const {
        branchId,
        id,
        newParentId,
        newSiblingIndexAfterMove,
    } = action.meta.arg;
    const node = state.byBranchId[branchId][id];
    const oldParentId = node.parentId;
    const oldIndex = state.childIds[branchId][oldParentId].indexOf(id);

    if (oldParentId === newParentId && newSiblingIndexAfterMove === oldIndex) return;

    state.byBranchId[branchId][id].parentId = newParentId;

    state.childIds[branchId][oldParentId].splice(oldIndex, 1);
    state.childIds[branchId][newParentId].splice(newSiblingIndexAfterMove, 0, id);

    buildTree(state, branchId, node.rootId);
}
