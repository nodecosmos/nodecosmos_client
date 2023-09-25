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
    const { ancestorIds: oldAncestorIds, descendantIds } = node;
    const newAncestorIds = state.byId[newParentId].ancestorIds.concat(newParentId);

    if (oldParentId === newParentId && newSiblingIndex === oldIndex) return;

    state.childIdsByParentId[oldParentId].splice(oldIndex, 1);
    state.childIdsByParentId[newParentId].splice(newSiblingIndex, 0, nodeId);

    if (oldParentId === newParentId) return; // no need to update ancestors

    // Update the parent id
    state.byId[nodeId].parentId = newParentId;

    const oldParent = state.byId[oldParentId];
    const newParent = state.byId[newParentId];

    oldParent.childIds.splice(oldIndex, 1);
    newParent.childIds ||= [];
    newParent.childIds.splice(newSiblingIndex, 0, nodeId);

    // update ancestors
    oldAncestorIds.forEach((ancestorId) => {
      const ancestor = state.byId[ancestorId];

      if (!ancestor) return;

      const descendantIndex = ancestor.descendantIds.indexOf(nodeId);

      // remove the node from the node's old ancestors
      ancestor.descendantIds.splice(descendantIndex, 1);

      // remove the node's descendants from the node's old ancestors
      descendantIds.forEach((descendantId) => {
        const ancestorIndex = ancestor.descendantIds.indexOf(descendantId);

        ancestor.descendantIds.splice(ancestorIndex, 1);
      });
    });

    state.byId[nodeId].ancestorIds = newAncestorIds;
    state.byId[nodeId].nestedLevel = newAncestorIds.length;

    // update descendants' ancestors
    const buildDescendantsAncestors = (currentNodeId = nodeId, currentAncestorIds = newAncestorIds) => {
      const currentNode = state.byId[currentNodeId];
      currentNode.childIds.forEach((childId) => {
        state.byId[childId].ancestorIds = currentAncestorIds.concat(currentNodeId);
        state.byId[childId].nestedLevel = currentAncestorIds.length + 1;
        buildDescendantsAncestors(childId, currentAncestorIds.concat(currentNodeId));
      });
    };

    buildDescendantsAncestors();
  },
};
