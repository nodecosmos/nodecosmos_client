export default {
  replaceTmpNodeWithPersistedNode(state, action) {
    const { tmpNodeId, persistentId } = action.payload;
    const { parentId } = state.byId[tmpNodeId];

    if (persistentId) {
      const tmpNodeSelected = state.byId[tmpNodeId].isSelected;
      state.byId[persistentId].isSelected = tmpNodeSelected;
      if (tmpNodeSelected) {
        state.selectedNodeId = persistentId;
      }

      const currentChildIds = state.childIdsByParentId[parentId];

      const newChildIds = currentChildIds
        .map((childId) => {
          if (childId === tmpNodeId) {
            return persistentId;
          }
          return childId;
        });

      state.childIdsByParentId[parentId] = newChildIds;
      state.byId[parentId].childIds = newChildIds;
      state.childIdsByParentId[persistentId] = [];
    }

    state.childIdsByParentId[parentId] = state.childIdsByParentId[parentId].filter(
      (childId) => childId !== tmpNodeId,
    );
    state.byId[parentId].childIds = state.childIdsByParentId[parentId];
    delete state.byId[tmpNodeId];
    delete state.childIdsByParentId[tmpNodeId];
  },
};
