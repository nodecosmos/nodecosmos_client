export default {
  setTreeNodesPositions(state, action) {
    const { rootNodeId, positionsById } = action.payload;
    state.positionsByRootIdAndTreeNodeId[rootNodeId] = positionsById;
  },
};
