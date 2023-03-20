export default {
  importNode: (state, action) => {
    const { id, importedNodeIds } = action.payload;
    const node = state.byId[id];

    node.childIds = [...node.childIds, ...importedNodeIds];
    state.childIdsByRootAndParentId[node.rootId][id] = node.childIds;
  },
};
