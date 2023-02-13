import { extractRootIdFromTreeNodeId } from '../trees.memoize';

export default {
  removeTreeNodeFromState(state, action) {
    const { treeNodeId } = action.payload;
    const rootNodeId = extractRootIdFromTreeNodeId(treeNodeId);
    const treeNodes = state.byRootNodeId[rootNodeId];
    const orderedTreeNodeIds = state.orderedTreeNodeIdsByRootNodeId[rootNodeId];

    delete treeNodes[treeNodeId];
    state.orderedTreeNodeIdsByRootNodeId[rootNodeId] = orderedTreeNodeIds.filter((id) => id !== treeNodeId);
  },
};
