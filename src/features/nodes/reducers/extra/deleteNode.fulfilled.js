export default function deleteNodeFulfilledReducer(state, action, slice) {
  slice.caseReducers.deleteNodeFromState(state, action);
}
