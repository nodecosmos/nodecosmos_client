export default {
  updateNodeState(state, action) {
    const { id } = action.payload;

    if (state.byId[id]) {
      state.byId[id] = { ...state.byId[id], ...action.payload };
    }
  },
};
