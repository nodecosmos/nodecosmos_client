// We use this approach to build tree as we want to enable reusability of nodes.
// This way we can either have *same* node multiple times in the tree & we can have
// same node in multiple trees.
// We construct the id by appending the original root node id, tree parent id and original node id.
// Reasoning is that parent can not have two completely same nodes as children. However, in future
// we will enable node count or node types in order to address this limitation.
import { TREES_TYPES } from '../trees.constants';

export default {
  buildTreeFromRootNode(state, action) {
    const { rootId, childIdsByParentId, type } = action.payload;

    // initialize state for root node
    state.byRootNodeId[rootId] ||= {};
    state.orderedTreeNodeIdsByRootNodeId[rootId] = [];

    if (!childIdsByParentId || !childIdsByParentId[rootId]) return;

    // Recursively map nodes
    const mapChildren = (
      {
        nodeId = rootId,
        parentId = null,
        treeParentId = null,
        treeUpperSiblingId = null,
        treeAncestorIds = [],
        treeDescendantIds = [],
        nestedLevel = 0,
      },
    ) => {
      const isRoot = nodeId === rootId;
      const treeNodeId = isRoot ? nodeId : `${rootId}->${treeParentId || parentId}->${nodeId}`;
      const currentTreeNode = state.byRootNodeId[rootId][treeNodeId] || {};

      let { isExpanded } = currentTreeNode;
      const { isSelected } = currentTreeNode;
      const isNewlyCreated = state.currentTempNodeId === nodeId;

      // TODO: this is good for now, but we will need to add logic to append selection to url
      isExpanded ||= isRoot || type === TREES_TYPES.checkbox || state.expandedNodeIds.includes(nodeId);

      // populate root's orderedTreeNodeIds with constructed id
      state.orderedTreeNodeIdsByRootNodeId[rootId].push(treeNodeId);

      const childIds = childIdsByParentId[nodeId];

      const isParentExpanded = isRoot || state.byRootNodeId[rootId][treeParentId].isExpanded;
      const isParentMounted = isRoot || state.byRootNodeId[rootId][treeParentId].isMounted;

      // initialize state for current node
      state.byRootNodeId[rootId][treeNodeId] = {
        treeNodeId,
        treeParentId,
        treeUpperSiblingId,
        treeAncestorIds,
        treeChildIds: [], // it will be populated on children iteration
        treeDescendantIds: [], // it will be populated on children iteration
        treeLastChildId: childIds.length > 0 ? `${rootId}->${treeNodeId}->${childIds[childIds.length - 1]}` : null,
        nodeId, // nodesSlice node id (not tree node id)
        persistentNodeId: isNewlyCreated ? null : nodeId,
        rootId,
        isRoot,
        isMounted: isRoot || isNewlyCreated || (isParentExpanded && isParentMounted),
        isExpanded: !!isExpanded,
        isSelected: !!isSelected,
        isEditing: isNewlyCreated || false,
        isNewlyCreated,
        nestedLevel,
      };

      // populate parent's childIds & parent's treeDescendantIds with constructed id
      if (treeParentId) {
        state.byRootNodeId[rootId][treeParentId].treeChildIds.push(treeNodeId);
        treeDescendantIds.push(treeNodeId);
      }

      // recursively map children
      childIds.forEach((childId, index) => {
        const currentTreeUpperSiblingId = index > 0 ? `${rootId}->${treeNodeId}->${childIds[index - 1]}` : null;

        mapChildren({
          nodeId: childId,
          parentId: nodeId,
          treeParentId: treeNodeId,
          treeUpperSiblingId: currentTreeUpperSiblingId,
          treeAncestorIds: [...treeAncestorIds, treeNodeId],
          treeDescendantIds: state.byRootNodeId[rootId][treeNodeId].treeDescendantIds,
          nestedLevel: nestedLevel + 1,
        });
      });

      // further populate parent's treeDescendantIds with current node's treeDescendantIds
      // after all children have been mapped
      if (treeDescendantIds) {
        treeDescendantIds.push(...state.byRootNodeId[rootId][treeNodeId].treeDescendantIds);
      }
    };

    mapChildren({});
  },
};
