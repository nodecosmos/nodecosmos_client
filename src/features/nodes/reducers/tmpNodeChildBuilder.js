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
      descendantIds: [],
      ancestorIds: [nodeId, ...node.ancestorIds],
      nestedLevel: node.nestedLevel + 1,
      order: state.childIdsByParentId[nodeId].length,
    }; // add new node to state

    state.childIdsByParentId[nodeId].push(tmpNodeId); // add new node to parent's childIds
    state.childIdsByParentId[tmpNodeId] = [];
  },
};
