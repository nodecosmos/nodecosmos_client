export default {
  setTreeNodesPositions(state, action) {
    state.positionsByNodeId = action.payload;
  },
};
