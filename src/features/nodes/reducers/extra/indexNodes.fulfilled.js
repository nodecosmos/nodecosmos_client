export default function indexNodesFulfilledReducer(state, action) {
  const params = action.meta.arg?.params || {};

  if (params.q && !params.page) {
    state.indexNodesById = {};
  }

  action.payload.forEach((node) => { state.indexNodesById[node.id] = node; });
}
