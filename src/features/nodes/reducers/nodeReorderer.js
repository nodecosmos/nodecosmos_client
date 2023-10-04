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
    const queue = [node.rootId];

    while (queue.length) {
      const currentId = queue.shift();
      const currentNode = state.byId[currentId];

      const children = state.childIdsByParentId[currentId] || [];
      children.forEach((childId) => {
        const childNode = state.byId[childId];
        childNode.ancestorIds = [...currentNode.ancestorIds, currentId];
        childNode.nestedLevel = childNode.ancestorIds.length;
        queue.push(childId);
      });
    }
  },
};
