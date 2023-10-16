export default {
  reorderNodes: (state, action) => {
    const {
      nodeId,
      newParentId,
      newSiblingIndex,
    } = action.payload;
    const node = state.byId[nodeId];
    const oldParentId = node.parentId;
    const oldIndex = state.childIdsByParentId[oldParentId].indexOf(nodeId);

    if (oldParentId === newParentId && newSiblingIndex === oldIndex) return;

    state.byId[nodeId].parentId = newParentId;

    state.childIdsByParentId[oldParentId].splice(oldIndex, 1);
    state.childIdsByParentId[newParentId].splice(newSiblingIndex, 0, nodeId);

    // Use a queue to set ancestorIds iteratively
    const queue = [node.treeRootNodeId];

    while (queue.length) {
      const currentId = queue.shift();
      const currentNode = state.byId[currentId];

      const childIds = state.childIdsByParentId[currentId] || [];
      state.byId[currentId].childIds = childIds;

      childIds.forEach((childId) => {
        state.byId[childId].ancestorIds = [...currentNode.ancestorIds, currentId];
        state.byId[childId].nestedLevel = currentNode.ancestorIds.length + 1;

        queue.push(childId);
      });
    }
  },
};
