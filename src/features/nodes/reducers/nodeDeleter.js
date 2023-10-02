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
    }

    delete state.indexNodesById[nodeId];

    delete state.byId[nodeId];
  },
};
