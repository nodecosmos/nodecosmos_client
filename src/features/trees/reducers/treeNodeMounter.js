import { extractRootIdFromTreeNodeId } from '../trees.memoize';

const mountDescendants = (state, treeNode) => {
  const { treeDescendantIds, rootNodeId } = treeNode;
  const rootNodesById = state.byRootNodeId[rootNodeId];

  treeDescendantIds.forEach((id) => {
    const { treeAncestorIds } = rootNodesById[id];

    // mount node if all ancestors are expanded
    rootNodesById[id].isMounted = treeAncestorIds.every(
      (ancestorId) => rootNodesById[ancestorId].isExpanded,
    );
  });
};

const unMountNodes = (state, treeNode) => {
  const { treeDescendantIds, rootNodeId } = treeNode;
  const rootNodesById = state.byRootNodeId[rootNodeId];

  treeDescendantIds.forEach((id) => { rootNodesById[id].isMounted = false; });
};

export default {
  expandTreeNode(state, action) {
    const treeNodeId = action.payload;
    const rootNodeId = extractRootIdFromTreeNodeId(treeNodeId);

    const treeNode = state.byRootNodeId[rootNodeId][treeNodeId];

    treeNode.isExpanded = true;

    mountDescendants(state, treeNode);
  },
  collapseTreeNode(state, action) {
    const treeNodeId = action.payload;
    const rootNodeId = extractRootIdFromTreeNodeId(treeNodeId);

    const treeNode = state.byRootNodeId[rootNodeId][treeNodeId];

    treeNode.isExpanded = false;

    unMountNodes(state, treeNode);
  },
};
