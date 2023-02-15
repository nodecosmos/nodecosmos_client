import { extractRootIdFromTreeNodeId } from '../trees.memoize';

export default {
  updateTreeNode(state, action) {
    const { treeNodeId } = action.payload;
    const rootNodeId = extractRootIdFromTreeNodeId(treeNodeId);
    const treeNodes = state.byRootNodeId[rootNodeId];
    const node = treeNodes[treeNodeId];

    treeNodes[treeNodeId] = { ...node, ...action.payload };
  },
};
