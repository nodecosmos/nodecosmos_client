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

    state.childIdsByParentId[oldParentId].splice(oldIndex, 1);
    state.childIdsByParentId[newParentId].splice(newSiblingIndex, 0, nodeId);

    if (oldParentId === newParentId) {
      state.byId[newParentId].childIds = state.childIdsByParentId[newParentId];
      return; // no need to update ancestors or descendants
    }

    // remove the node from the old parent's child ids
    state.byId[oldParentId].childIds.splice(oldIndex, 1);

    const oldAncestorIds = node.ancestorIds;
    const { descendantIds } = node;

    // remove node and its descendants from old ancestors
    removeNodeFromOldAncestors(state, nodeId, oldAncestorIds, descendantIds);

    // add node and its descendants to new ancestors
    const newParent = state.byId[newParentId];
    const newAncestorIds = newParent.ancestorIds.concat(newParentId);
    addNodeToNewAncestors(state, nodeId, newAncestorIds, descendantIds);

    // Update the parent id
    state.byId[nodeId].parentId = newParentId;

    // Update the ancestor ids and nested level of the node
    state.byId[nodeId].ancestorIds = newAncestorIds;
    state.byId[nodeId].nestedLevel = newAncestorIds.length;

    // Add the node to the new parent's child ids
    state.byId[newParentId].childIds = state.childIdsByParentId[newParentId];

    // Update the ancestors and nested level of the node's descendants
    addNewAncestorsToDescendants(state, nodeId, newAncestorIds);
  },
};

function removeNodeFromOldAncestors(state, nodeId, oldAncestorIds, descendantIds) {
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
}

function addNodeToNewAncestors(state, nodeId, newAncestorIds, descendantIds) {
  newAncestorIds.forEach((ancestorId) => {
    const ancestor = state.byId[ancestorId];

    if (!ancestor) return;

    // add the node to the node's new ancestors
    ancestor.descendantIds.push(nodeId);

    // add the node's descendants to the node's new ancestors
    descendantIds.forEach((descendantId) => {
      ancestor.descendantIds.push(descendantId);
    });
  });
}

function addNewAncestorsToDescendants(state, currentNodeId, currentAncestorIds) {
  const currentNode = state.byId[currentNodeId];
  currentNode.childIds.forEach((childId) => {
    state.byId[childId].ancestorIds = currentAncestorIds.concat(currentNodeId);
    state.byId[childId].nestedLevel = currentAncestorIds.length + 1;
    addNewAncestorsToDescendants(state, childId, currentAncestorIds.concat(currentNodeId));
  });
}
