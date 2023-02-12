// We use this approach to build tree as we want to enable reusability of nodes.
// This way we can either have *same* node multiple times in the tree, and we can have
// same node in multiple trees.
// We construct the id by appending the root node id, parent id and node id.
// Reasoning is that parent can not have two completely same nodes as children. However, in future
// we will enable node count or node types in order to address this limitation.

export const buildTreeFromRootNode = ({ state, rootNode }) => {
  const { descendantsById } = rootNode;

  const mapChildren = (
    {
      node = rootNode,
      parentId = null,
      persistedParentId = null,
      upperSiblingId = null,
      ancestorIds = [],
      descendantIds = null,
      nestedLevel = 0,
    },
  ) => {
    const isRoot = node.id === rootNode.id;
    // construct id
    const id = isRoot ? node.id : `${rootNode.id}-${persistedParentId}-${node.id}`;

    // initialize state for node
    state.childIdsByParentId[id] = [];
    state.mountedTreeNodesById[id] = isRoot; // mount root node by default
    state.expandedTreeNodesById[id] = false;
    state.byId[id] = {
      ...node,
      id,
      parentId,
      upperSiblingId,
      ancestorIds,
      nestedLevel,
      childIds: [],
      descendantIds: [],
    };

    // populate parent's childIds with constructed id
    if (parentId) {
      state.byId[parentId].childIds.push(id);
      state.childIdsByParentId[parentId].push(id);
      // populate parent's descendantIds with current node's id
      descendantIds.push(id);
    }

    // recursively map children
    node.childIds.forEach((childId, index) => {
      mapChildren({
        node: descendantsById[childId],
        parentId: id,
        persistedParentId: node.id,
        upperSiblingId: node.childIds[index - 1],
        ancestorIds: [...ancestorIds, id],
        descendantIds: state.byId[id].descendantIds,
        nestedLevel: nestedLevel + 1,
      });
    });

    // further populate parent's descendantIds with current node's descendantIds
    // after all children have been mapped
    if (descendantIds) descendantIds.push(...state.byId[id].descendantIds);
  };

  mapChildren({});

  delete rootNode.descendantsById;
};

const toggleNodesMount = (state, nodeIds) => {
  nodeIds.forEach((id) => {
    const node = state.byId[id];

    // mount node if all ancestors are expanded
    state.mountedTreeNodesById[node.id] = node.ancestorIds.every(
      (ancestorId) => state.expandedTreeNodesById[ancestorId],
    );
  });
};

const unMountNodes = (state, nodeIds) => { nodeIds.forEach((id) => { state.mountedTreeNodesById[id] = false; }); };

export default {
  expandNode(state, action) {
    const { id } = action.payload;
    state.expandedTreeNodesById[id] = true;

    const { descendantIds } = state.byId[id];

    toggleNodesMount(state, descendantIds);
  },
  collapseNode(state, action) {
    const { id } = action.payload;
    state.expandedTreeNodesById[id] = false;

    const { descendantIds } = state.byId[id];

    unMountNodes(state, descendantIds);
  },
};
