export default function indexNodesFulfilledReducer(state, action) {
  // const params = action.meta.arg?.params || {};

  state.indexNodesById = {};

  action.payload.forEach((node) => { state.indexNodesById[node.id] = node; });
}
