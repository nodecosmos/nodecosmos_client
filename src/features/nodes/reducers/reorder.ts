import { updateAncestors } from './show';
import { reorder } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function reorderFulfilled(state: NodeState, action: ReturnType<typeof reorder.fulfilled>) {
    const {
        currentBranchId,
        id,
        newParentId,
        newSiblingIndexAfterMove,
    } = action.meta.arg;
    const node = state.byBranchId[currentBranchId][id];
    const oldParentId = node.parentId;
    const oldIndex = state.childIds[currentBranchId][oldParentId].indexOf(id);

    if (oldParentId === newParentId && newSiblingIndexAfterMove === oldIndex) return;

    state.byBranchId[currentBranchId][id].parentId = newParentId;

    state.childIds[currentBranchId][oldParentId].splice(oldIndex, 1);
    state.childIds[currentBranchId][newParentId].splice(newSiblingIndexAfterMove, 0, id);

    state.byBranchId[currentBranchId][oldParentId].childIds.splice(oldIndex, 1);
    state.byBranchId[currentBranchId][newParentId].childIds.splice(newSiblingIndexAfterMove, 0, id);
    state.byBranchId[currentBranchId][newParentId].isDragOver = false;

    updateAncestors(state, node.treeRootId, currentBranchId);
}
