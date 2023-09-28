export default {
  clearTmpNode(state, action) {
    const nodeId = action.payload.id;
    const node = state.byId[nodeId];

    if (node && node.isTemp) {
      console.log(nodeId);

      delete state[nodeId];
      delete state.childIdsByParentId[node.id];

      const parent = state.byId[node.parentId];
      state.childIdsByParentId[node.parentId] = state.childIdsByParentId[node.parentId].filter((id) => id !== nodeId);
      state.byId[parent.id].childIds = state.childIdsByParentId[parent.id];
    }
  },
};
