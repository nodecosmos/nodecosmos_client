import { buildTreeNodeId } from '../trees.memoize';

export default {
  buildTmpTreeNode(state, action) {
    const {
      treeRootNodeId,
      nodeId,
      treeNodeId,
      tmpNodeId,
    } = action.payload;

    const tmpTreeNodeId = buildTreeNodeId(treeRootNodeId, nodeId, tmpNodeId);
    const parent = state.byRootNodeId[treeRootNodeId][treeNodeId];
    const parentTreeAncestorIds = parent.treeAncestorIds || [];
    const treeAncestorIds = [...parentTreeAncestorIds, parent.treeNodeId];
    const treeUpperSiblingId = parent.treeLastChildId;

    state.byRootNodeId[action.payload.treeRootNodeId][tmpTreeNodeId] = {
      treeNodeId: tmpTreeNodeId,
      treeParentId: parent.treeNodeId,
      treeUpperSiblingId,
      treeAncestorIds,
      treeSiblingIndex: parent.treeChildIds.length,
      treeChildIds: [],
      treeDescendantIds: [],
      treeLastChildId: null,
      nodeId: tmpNodeId,
      rootId: treeRootNodeId,
      isRoot: false,
      isMounted: true,
      isExpanded: false,
      isEditing: true,
      isNewlyCreated: true,
      nestedLevel: parent.nestedLevel + 1,
    };

    const orderedTreeNodeIds = state.orderedTreeNodeIdsByRootNodeId[treeRootNodeId];
    let insertAfterId = treeUpperSiblingId || parent.treeNodeId;

    if (treeUpperSiblingId) {
      const upperSiblingDescendants = state.byRootNodeId[treeRootNodeId][treeUpperSiblingId].treeDescendantIds;
      const lastUpperSiblingDescendantId = upperSiblingDescendants[upperSiblingDescendants.length - 1];

      insertAfterId = lastUpperSiblingDescendantId || treeUpperSiblingId;
    }

    state.orderedTreeNodeIdsByRootNodeId[treeRootNodeId].splice(
      orderedTreeNodeIds.indexOf(insertAfterId) + 1,
      0,
      tmpTreeNodeId,
    );

    parent.treeChildIds.push(tmpTreeNodeId);
    parent.treeLastChildId = tmpTreeNodeId;

    treeAncestorIds.forEach((ancestorId) => {
      // insertAfterId
      const ancestorDescendants = state.byRootNodeId[action.payload.treeRootNodeId][ancestorId].treeDescendantIds;
      state.byRootNodeId[action.payload.treeRootNodeId][ancestorId].treeDescendantIds.splice(
        ancestorDescendants.indexOf(insertAfterId) + 1,
        0,
        tmpTreeNodeId,
      );
    });
  },
};
