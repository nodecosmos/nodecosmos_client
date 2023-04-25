export default function showNodeFulfilledReducer(state, action) {
  action.payload.forEach((node) => {
    // default values
    node.childIds ||= [];
    node.ancestorIds ||= [];
    node.descendantIds ||= [];
    node.persistentId ||= node.id;
    node.persistentParentId ||= node.parentId;

    state.byId[node.id] = node;

    state.childIdsByRootAndParentId[node.rootId] ||= {};
    state.childIdsByRootAndParentId[node.rootId][node.id] ||= node.childIds;
    state.nodeTitlesById[node.id] = node.title;
  });
}
