export default function likeNodeFulfilledReducer(state, action) {
    const {
        id, likesCount, likedByCurrentUser, 
    } = action.payload;
    if (state.byId[id]) {
        state.byId[id].likesCount = likesCount;
        state.byId[id].likedByCurrentUser = likedByCurrentUser;
    }

    if (state.indexNodesById[id]) {
        state.indexNodesById[id].likesCount = likesCount;
    }
}
