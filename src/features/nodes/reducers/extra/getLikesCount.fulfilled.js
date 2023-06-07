export default function likeNodeFulfilledReducer(state, action) {
  const { id, likesCount } = action.payload;
  state.byId[id].likesCount = likesCount;
}
