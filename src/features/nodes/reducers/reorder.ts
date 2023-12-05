import { buildTree } from './tree';
import { reorder } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function reorderFulfilled(state: NodeState, action: ReturnType<typeof reorder.fulfilled>) {
    const {
        treeBranchId,
        id,
        newParentId,
        newSiblingIndexAfterMove,
    } = action.meta.arg;
    const node = state.byBranchId[treeBranchId][id];
    const oldParentId = node.parentId;
    const oldIndex = state.childIds[treeBranchId][oldParentId].indexOf(id);

    if (oldParentId === newParentId && newSiblingIndexAfterMove === oldIndex) return;

    state.byBranchId[treeBranchId][id].parentId = newParentId;

    state.childIds[treeBranchId][oldParentId].splice(oldIndex, 1);
    state.childIds[treeBranchId][newParentId].splice(newSiblingIndexAfterMove, 0, id);

    state.byBranchId[treeBranchId][newParentId].isDragOver = false;
    state.byBranchId[treeBranchId][newParentId].isExpanded = true;

    buildTree(state, treeBranchId, node.treeRootId);
}
