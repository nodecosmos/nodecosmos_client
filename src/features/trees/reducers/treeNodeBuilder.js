import { extractRootIdFromTreeNodeId } from '../trees.memoize';

const extractLastDescendantId = (treeNodes, treeParentId) => treeNodes[treeParentId].treeDescendantIds.slice(-1)[0];

export default {
  buildChildNode(state, action) {
    const { treeParentId, parentId, tmpNodeId } = action.payload;
    const rootNodeId = extractRootIdFromTreeNodeId(treeParentId);

    const treeNodes = state.byRootNodeId[rootNodeId];
    const parent = treeNodes[treeParentId];

    // This seems to go against the redux way of doing things
    // https://redux.js.org/style-guide/#reducers-must-not-have-side-effects
    const tmpTreeNodeId = `${rootNodeId}-${parentId}-${tmpNodeId}`;

    const treeAncestorIds = [treeParentId, ...parent.treeAncestorIds];
    const treeUpperSiblingId = parent.treeLastChildId;

    treeNodes[tmpTreeNodeId] = {
      treeNodeId: tmpTreeNodeId,
      treeParentId,
      treeUpperSiblingId,
      treeAncestorIds,
      treeChildIds: [],
      treeDescendantIds: [],
      treeLowerSiblingId: null,
      treeLastChildId: null,
      nodeId: tmpNodeId, // original node id (not tree node id)
      parentId, // original parent id (not tree parent id)
      rootNodeId,
      isRoot: false,
      isMounted: true, // mount new node by default
      isExpanded: false,
      isSelected: false,
      isEditing: true,
      isTemp: true,
      nestedLevel: parent.nestedLevel + 1,
    };

    let insertAfterTreeId = null;
    if (treeUpperSiblingId) {
      const lastUpperSiblingTreeDescendantId = extractLastDescendantId(treeNodes, treeUpperSiblingId);
      insertAfterTreeId = lastUpperSiblingTreeDescendantId || treeUpperSiblingId;
    } else if (treeParentId) {
      const lastParentDescendantId = extractLastDescendantId(treeNodes, treeParentId);
      insertAfterTreeId = lastParentDescendantId || treeParentId;
    }

    /**
     * @description
     * Either after the last upper sibling's descendant or after upperSibling, or after last parent's descendant
     * or after parent.
     * For now, we could only use last parent's descendant or parent, but in future we might want to build node
     * at specific index.
     */
    const orderedIndex = state.orderedTreeNodeIdsByRootNodeId[rootNodeId].indexOf(insertAfterTreeId) + 1;

    state.orderedTreeNodeIdsByRootNodeId[rootNodeId].splice(orderedIndex, 0, tmpTreeNodeId);

    // add temp node to parent's children
    parent.treeChildIds.push(tmpTreeNodeId);
    parent.treeLastChildId = tmpTreeNodeId;

    treeAncestorIds.forEach((ancestorId) => {
      // add temp node to ancestor's descendants
      if (treeNodes[ancestorId]) treeNodes[ancestorId].treeDescendantIds.push(tmpTreeNodeId);
    });
  },

  handleNewNodeCreation(state, action) {
    const { treeNodeId, id } = action.payload;
    const rootNodeId = extractRootIdFromTreeNodeId(treeNodeId);

    state.byRootNodeId[rootNodeId][treeNodeId].nodeId = id;
    state.byRootNodeId[rootNodeId][treeNodeId].isTemp = false;
  },
};
