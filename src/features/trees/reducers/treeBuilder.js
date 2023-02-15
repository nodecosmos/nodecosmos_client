// We use this approach to build tree as we want to enable reusability of nodes.
// This way we can either have *same* node multiple times in the tree & we can have
// same node in multiple trees.
// We construct the id by appending the original root node id, original parent id and original node id.
// Reasoning is that parent can not have two completely same nodes as children. However, in future
// we will enable node count or node types in order to address this limitation.
export default {
  buildTreeFromRootNode(state, action) {
    const rootNode = action.payload;
    const { descendantsById, id: rootNodeId } = rootNode;

    if (!descendantsById) return;

    // initialize state for root node
    state.byRootNodeId[rootNodeId] = {};
    state.orderedTreeNodeIdsByRootNodeId[rootNodeId] = [];

    // Recursively map nodes
    const mapChildren = (
      {
        node = rootNode,
        parentId = null,
        treeParentId = null,
        treeUpperSiblingId = null,
        treeAncestorIds = [],
        treeDescendantIds = null,
        nestedLevel = 0,
      },
    ) => {
      const isRoot = node.id === rootNode.id;
      const treeNodeId = isRoot ? node.id : `${rootNode.id}-${parentId}-${node.id}`;

      // initialize state for current node
      state.byRootNodeId[rootNodeId][treeNodeId] = {
        treeNodeId,
        treeParentId,
        treeUpperSiblingId,
        treeAncestorIds,
        treeChildIds: [], // it will be populated on children iteration
        treeDescendantIds: [], // it will be populated on children iteration
        treeLastChildId: node.childIds.length && `${rootNode.id}-${node.id}-${node.childIds[node.childIds.length - 1]}`,
        nodeId: node.id, // original node id (not tree node id)
        parentId, // original parent id (not tree parent id)
        rootNodeId,
        isRoot,
        isMounted: isRoot, // mount root node by default
        isExpanded: false,
        isSelected: false,
        isEditing: false,
        nestedLevel,
      };

      // populate root's orderedTreeNodeIds with constructed id
      state.orderedTreeNodeIdsByRootNodeId[rootNodeId].push(treeNodeId);

      // populate parent's childIds & treeDescendantIds with constructed id
      if (treeParentId) {
        state.byRootNodeId[rootNodeId][treeParentId].treeChildIds.push(treeNodeId);
        treeDescendantIds.push(treeNodeId);
      }

      // recursively map children
      node.childIds.forEach((childId, index) => {
        const currentTreeUpperSiblingId = index && `${rootNode.id}-${node.id}-${node.childIds[index - 1]}`;

        mapChildren({
          node: descendantsById[childId],
          parentId: node.id,
          treeParentId: treeNodeId,
          treeUpperSiblingId: currentTreeUpperSiblingId,
          treeAncestorIds: [...treeAncestorIds, treeNodeId],
          treeDescendantIds: state.byRootNodeId[rootNodeId][treeNodeId].treeDescendantIds,
          nestedLevel: nestedLevel + 1,
        });
      });

      // further populate parent's treeDescendantIds with current node's treeDescendantIds
      // after all children have been mapped
      if (treeDescendantIds) treeDescendantIds.push(...state.byRootNodeId[rootNodeId][treeNodeId].treeDescendantIds);
    };

    mapChildren({});
  },
};
