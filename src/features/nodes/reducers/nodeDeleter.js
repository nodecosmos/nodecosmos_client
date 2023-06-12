export default {
  deleteNodeFromState(state, action) {
    const { nodeId } = action.payload;

    const node = state.byId[nodeId];
    const parent = state.byId[node.parentId];

    const childIdsByRootAndParentId = state.childIdsByRootAndParentId[node.rootId];

    delete childIdsByRootAndParentId[nodeId];

    // filter from childIdsByRootAndParentId
    if (parent) {
      if (childIdsByRootAndParentId[node.parentId]) {
        childIdsByRootAndParentId[node.parentId] = childIdsByRootAndParentId[node.parentId].filter(
          (id) => id !== nodeId,
        );
      }
      parent.childIds = parent.childIds.filter((id) => id !== nodeId);
    }

    // delete state.byId[nodeId] - race condition: seems existing components are kept before tree re-render
    // let's see if we can fix this
  },
};
