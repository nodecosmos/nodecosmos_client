export default function likeNodeFulfilledReducer(state, action) {
  const { id, likesCount, likedByCurrentUser } = action.payload;
  state.byId[id].likesCount = likesCount;
  state.byId[id].likedByCurrentUser = likedByCurrentUser;
}
