export default {
  buildChildNode: (state, action) => {
    const { tmpNodeId, nodeId } = action.payload;
    const node = state.byId[nodeId];

    state.byId[tmpNodeId] = {
      persistentId: null,
      parentId: nodeId,
      rootId: node.rootId,
      isTemp: true,
      likesCount: 0,
      likedByUserIds: [],
      childIds: [],
      descendantIds: [],
      ancestorIds: [nodeId, ...node.ancestorIds],
      nestedLevel: node.nestedLevel + 1,
    }; // add new node to state

    state.childIdsByParentId[nodeId].push(tmpNodeId); // add new node to parent's childIds
    state.childIdsByParentId[tmpNodeId] = [];
    state.byId[nodeId].childIds.push(tmpNodeId); // add new node to parent's childIds
  },
};
