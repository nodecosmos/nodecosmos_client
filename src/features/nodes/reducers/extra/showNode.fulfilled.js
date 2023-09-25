export default function showNodeFulfilledReducer(state, action) {
  const currentRootId = action.meta.arg.id;

  action.payload.forEach((node) => {
    const stateNode = state.byId[node.id] || {};

    // default values
    node.isTemp = false;
    node.persistentId = node.id;
    node.childIds ||= [];
    node.ancestorIds ||= [];
    node.descendantIds ||= [];
    node.nestedLevel = node.ancestorIds.length;

    // description call comes faster than showNode call, so we need to make sure we don't override the descriptions
    node.description = stateNode.description;
    node.descriptionMarkdown = stateNode.descriptionMarkdown;
    node.shortDescription = stateNode.shortDescription;

    // TODO: this is good for now, but we will need to add logic to append selection to url
    if (node.id === currentRootId) {
      state.selectedNodeId = node.id;
    }

    state.byId[node.id] = node;

    state.childIdsByParentId[node.id] = node.childIds;
    state.nodeTitlesById[node.id] = node.title;
  });
}
