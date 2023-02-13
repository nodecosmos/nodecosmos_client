import { extractRootIdFromTreeNodeId } from '../trees.memoize';

export default {
  buildNewTreeNode(state, action) {
    const { treeParentId, parentId } = action.payload;
    const rootNodeId = extractRootIdFromTreeNodeId(treeParentId);

    const treeNodes = state.byRootNodeId[rootNodeId];
    const orderedTreeNodeIds = state.orderedTreeNodeIdsByRootNodeId[rootNodeId];

    const parent = treeNodes[treeParentId];

    // This seems to go against the redux way of doing things
    // https://redux.js.org/style-guide/#reducers-must-not-have-side-effects
    const tmpTreeNodeId = `${rootNodeId}-${parentId}-${Date.now()}}`;

    const treeAncestorIds = parent.treeAncestorIds.length
      ? [treeParentId, ...parent.treeAncestorIds] : [treeParentId];

    treeNodes[tmpTreeNodeId] = {
      treeNodeId: tmpTreeNodeId,
      treeParentId,
      nodeId: null,
      rootId: rootNodeId,
      isRoot: false,
      isMounted: true,
      isExpanded: false,
      isSelected: false,
      isEditing: true,
      isNewlyAddedNode: true,
      treeChildIds: [],
      treeAncestorIds,
      treeDescendantIds: [],
    };
    orderedTreeNodeIds.push(tmpTreeNodeId);

    // add temp node to parent's children
    parent.treeChildIds.push(tmpTreeNodeId);

    treeAncestorIds.forEach((ancestorId) => {
      // add temp node to ancestor's descendants
      if (treeNodes[ancestorId]) treeNodes[ancestorId].treeDescendantIds.push(tmpTreeNodeId);
    });
  },
};
