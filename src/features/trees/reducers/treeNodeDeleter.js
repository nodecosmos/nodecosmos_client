import { extractRootIdFromTreeNodeId } from '../trees.memoize';

export default {
  deleteTreeNodeFromState(state, action) {
    const { treeNodeId } = action.payload;
    const rootId = extractRootIdFromTreeNodeId(treeNodeId);

    const treeNode = state.byRootNodeId[rootId][treeNodeId];
    const treeParent = state.byRootNodeId[rootId][treeNode.treeParentId];

    const descendantTreeIds = treeNode.treeDescendantIds;

    // update upperSiblingId of bottom Sibling
    if (treeParent.treeChildIds.length > 0) {
      const nodeIndex = treeParent.treeChildIds.indexOf(treeNodeId);
      const bottomSiblingId = treeParent.treeChildIds[nodeIndex + 1];

      if (bottomSiblingId) {
        state.byRootNodeId[rootId][bottomSiblingId].treeUpperSiblingId = treeNode.treeUpperSiblingId;
      }
    }

    // Remove node and it's descendants from ancestors' descendants
    treeNode.treeAncestorIds.forEach((treeAncestorId) => {
      const { treeDescendantIds } = state.byRootNodeId[rootId][treeAncestorId];
      state.byRootNodeId[rootId][treeAncestorId].treeDescendantIds = treeDescendantIds.filter(
        (id) => id !== treeNodeId && !descendantTreeIds.includes(id),
      );
    });

    treeParent.treeChildIds = treeParent.treeChildIds.filter((id) => id !== treeNodeId);
    treeParent.treeLastChildId = treeParent.treeChildIds[treeParent.treeChildIds.length - 1];

    // Remove node and it's descendants from root's ordered tree node ids
    state.orderedTreeNodeIdsByRootNodeId[rootId] = state.orderedTreeNodeIdsByRootNodeId[rootId].filter(
      (id) => id !== treeNodeId && !descendantTreeIds.includes(id),
    );

    delete state.byRootNodeId[rootId][treeNodeId];
    descendantTreeIds.forEach((descendantId) => {
      delete state.byRootNodeId[rootId][descendantId];
    });
  },
};
