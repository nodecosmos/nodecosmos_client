export default {
  buildTmpNode: (state, action) => {
    const { tmpNodeId, nodeId } = action.payload;
    const node = state.byId[nodeId];

    state.byId[tmpNodeId] = {
      persistentId: null,
      parentId: nodeId,
      rootId: node.rootId,
      isTemp: true,
      likesCount: 0,
      likedByUserIds: [],
      descendantIds: [],
      ancestorIds: [nodeId, ...node.ancestorIds],
      nestedLevel: node.nestedLevel + 1,
      order: state.childIdsByParentId[nodeId].length + 1,
    };

    state.childIdsByParentId[nodeId].push(tmpNodeId);
    state.childIdsByParentId[tmpNodeId] = [];

    state.byId[tmpNodeId].childIds = [];
  },
};
