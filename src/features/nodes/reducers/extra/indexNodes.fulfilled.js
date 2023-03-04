export default function indexNodesFulfilledReducer(state, action) {
  action.payload.forEach((node) => { state.indexNodesById[node.id] = node; });
}
