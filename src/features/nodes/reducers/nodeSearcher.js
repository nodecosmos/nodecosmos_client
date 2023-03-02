export default {
  searchNode(state, action) {
    const { rootId, value } = action.payload;

    const newChildIdsByRootAndParentId = {};

    if (!value) {
      for (const nodeId in state.byId) {
        if (state.byId[nodeId]) {
          newChildIdsByRootAndParentId[nodeId] = state.byId[nodeId].childIds;
        }
      }
    } else {
      for (const nodeId in state.byId) {
        if (state.byId[nodeId].title.toLowerCase().includes(value.toLowerCase())) {
          newChildIdsByRootAndParentId[nodeId] ||= [];
          let currentNodeId = nodeId;
          let { parentId } = state.byId[nodeId];

          while (parentId) {
            if (state.byId[parentId]) {
              newChildIdsByRootAndParentId[parentId] ||= [];

              if (!newChildIdsByRootAndParentId[parentId].includes(currentNodeId)) {
                newChildIdsByRootAndParentId[parentId].push(currentNodeId);
              }

              currentNodeId = parentId;
              parentId = state.byId[parentId].parentId;
            } else {
              break;
            }
          }
        }
      }
    }

    state.childIdsByRootAndParentId[rootId] = newChildIdsByRootAndParentId;
  },
};
