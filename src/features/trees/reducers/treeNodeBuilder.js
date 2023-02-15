import { extractRootIdFromTreeNodeId } from '../trees.memoize';

export default {
  buildChildNode(state, action) {
    const { treeParentId, parentId } = action.payload;
    const rootNodeId = extractRootIdFromTreeNodeId(treeParentId);

    const treeNodes = state.byRootNodeId[rootNodeId];
    const parent = treeNodes[treeParentId];

    // This seems to go against the redux way of doing things
    // https://redux.js.org/style-guide/#reducers-must-not-have-side-effects
    const tmpTreeNodeId = `${rootNodeId}-${parentId}-${Date.now()}`;

    const treeAncestorIds = [treeParentId, ...parent.treeAncestorIds];
    const treeUpperSiblingId = parent.treeLastChildId;

    treeNodes[tmpTreeNodeId] = {
      treeNodeId: tmpTreeNodeId,
      treeParentId,
      treeUpperSiblingId,
      treeAncestorIds,
      treeChildIds: [], // it will be populated on children iteration
      treeDescendantIds: [], // it will be populated on children iteration
      treeLastChildId: null,
      nodeId: null, // original node id (not tree node id)
      parentId, // original parent id (not tree parent id)
      rootNodeId,
      isRoot: false,
      isMounted: true, // mount root node by default
      isExpanded: false,
      isSelected: false,
      isEditing: true,
      nestedLevel: parent.nestedLevel + 1,
    };

    state.orderedTreeNodeIdsByRootNodeId[rootNodeId].push(tmpTreeNodeId);

    // add temp node to parent's children
    parent.treeChildIds.push(tmpTreeNodeId);
    parent.treeLastChildId = tmpTreeNodeId;

    treeAncestorIds.forEach((ancestorId) => {
      // add temp node to ancestor's descendants
      if (treeNodes[ancestorId]) treeNodes[ancestorId].treeDescendantIds.push(tmpTreeNodeId);
    });
  },
};
