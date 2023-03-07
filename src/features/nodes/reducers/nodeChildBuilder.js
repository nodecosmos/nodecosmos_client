export default {
  buildChildNode: (state, action) => {
    const { tmpNodeId, nodeId, persistentId } = action.payload;
    const node = state.byId[nodeId];

    state.byId[tmpNodeId] = {
      persistentId: null,
      parentId: nodeId,
      persistentParentId: persistentId,
      rootId: node.rootId,
      isTemp: true,
      likesCount: 0,
      likedByUserIds: [],
      childIds: [],
      ancestorIds: [nodeId, ...node.ancestorIds],
    }; // add new node to state

    state.childIdsByRootAndParentId[node.rootId][nodeId].push(tmpNodeId); // add new node to parent's childIds
    state.childIdsByRootAndParentId[node.rootId][tmpNodeId] = [];

    state.byId[nodeId].childIds.push(tmpNodeId); // add new node to parent's childIds
  },
};
