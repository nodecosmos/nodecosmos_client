export default {
  setNodeDetailsAction: (state, action) => {
    state.nodeDetailsAction = action.payload;
  },
  setDefaultNodeDetailsAction: (state) => {
    state.nodeDetailsAction = 'description';
  },
};
