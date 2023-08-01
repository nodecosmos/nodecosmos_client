export default {
  reorderNodes: (state, action) => {
    const {
      nodeId,
      newParentId,
      newSiblingIndex,
    } = action.payload;

    const node = state.byId[nodeId];
    const oldParentId = node.parentId;
    const persistentId = state.persistedIdByNodeId[nodeId];
    const newPersistentParentId = state.persistedIdByNodeId[newParentId];
    const oldIndex = state.childIdsByRootAndParentId[node.rootId][oldParentId].indexOf(nodeId);
    const { ancestorIds: oldAncestorIds, descendantIds } = node;
    const newAncestorIds = state.byId[newParentId].ancestorIds.concat(newParentId);

    if (oldParentId === newParentId && newSiblingIndex === oldIndex) return;

    if (oldIndex > newSiblingIndex) {
      state.childIdsByRootAndParentId[node.rootId][oldParentId].splice(oldIndex, 1);
      state.childIdsByRootAndParentId[node.rootId][newParentId].splice(newSiblingIndex, 0, nodeId);
    } else {
      state.childIdsByRootAndParentId[node.rootId][newParentId].splice(newSiblingIndex, 0, nodeId);
      state.childIdsByRootAndParentId[node.rootId][oldParentId].splice(oldIndex, 1);
    }

    if (oldParentId === newParentId) return;

    // Update the parent and persistent parent ids
    state.byId[nodeId].parentId = newParentId;
    state.byId[persistentId].parentId = newParentId;

    state.byId[nodeId].persistentParentId = newPersistentParentId;
    state.byId[persistentId].persistentParentId = newPersistentParentId;

    // update ancestors
    oldAncestorIds.forEach((ancestorId) => {
      const ancestor = state.byId[ancestorId];
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
