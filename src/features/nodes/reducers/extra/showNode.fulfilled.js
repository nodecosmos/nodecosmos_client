export default function showNodeFulfilledReducer(state, action) {
  // In case we access the non-root node directly, we need to set the rootId to the current rootId
  const currentRootId = action.meta.arg.id;

  action.payload.forEach((node) => {
    // default values
    node.childIds ||= [];
    node.ancestorIds ||= [];
    node.descendantIds ||= [];
    node.persistentId ||= node.id;
    node.persistentParentId ||= node.parentId;
    node.persistentRootId ||= node.rootId;
    node.nestedLevel = node.ancestorIds.length;

    if (currentRootId) {
      node.rootId = currentRootId;
    }

    // TODO: this is good for now, but we will need to add logic to append selection to url
    if (node.id === currentRootId) {
      state.selectedNodeId = node.id;
    }

    state.byId[node.id] = node;

    state.childIdsByRootAndParentId[node.rootId] ||= {};
    state.childIdsByRootAndParentId[node.rootId][node.id] = node.childIds || [];
    state.nodeTitlesById[node.id] = node.title;

    state.persistedIdByNodeId[node.id] = node.id;
  });
}
