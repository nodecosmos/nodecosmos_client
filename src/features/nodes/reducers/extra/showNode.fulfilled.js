export default function showNodeFulfilledReducer(state, action) {
  action.payload.forEach((node) => {
    node.childIds ||= [];
    state.byId[node.id] = node;
    state.childIdsByRootAndParentId[node.rootId] ||= {};
    state.childIdsByRootAndParentId[node.rootId][node.id] ||= node.childIds;
  });
}
