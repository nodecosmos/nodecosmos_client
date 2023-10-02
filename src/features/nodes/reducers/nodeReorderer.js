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
  },
};
