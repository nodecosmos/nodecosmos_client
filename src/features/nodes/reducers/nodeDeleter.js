export default {
  deleteNodeFromState(state, action) {
    const { nodeId } = action.payload;

    const node = state.byId[nodeId];
    const parent = state.byId[node.parentId];

    delete state.childIdsByParentId[nodeId];

    // filter from childIdsByParentId
    if (parent) {
      if (state.childIdsByParentId[node.parentId]) {
        state.childIdsByParentId[node.parentId] = state.childIdsByParentId[node.parentId].filter(
          (id) => id !== nodeId,
        );
      }
      parent.childIds = parent.childIds.filter((id) => id !== nodeId);
    }

    node.descendantIds.forEach((id) => {
      delete state.indexNodesById[id];
    });

    delete state.indexNodesById[nodeId];

    // delete state.byId[nodeId] - race condition: seems existing components are kept before tree re-render
    // let's see if we can fix this
  },
};
