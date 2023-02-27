export default function likeNodeFulfilledReducer(state, action) {
  const { id, likesCount, likedByUserIds } = action.payload;
  state.byId[id].likesCount = likesCount;
  state.byId[id].likedByUserIds = likedByUserIds;
}
