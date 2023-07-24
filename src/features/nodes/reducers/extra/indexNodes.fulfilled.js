export default function indexNodesFulfilledReducer(state, action) {
  if (action.meta.arg) {
    state.indexNodesById = {};
  }
  action.payload.forEach((node) => { state.indexNodesById[node.id] = node; });
}
