import { extractRootIdFromTreeNodeId } from '../trees.memoize';

export default {
  updateTreeNode(state, action) {
    const { treeNodeId } = action.payload;
    const rootId = extractRootIdFromTreeNodeId(treeNodeId);
    const treeNodes = state.byRootNodeId[rootId];
    const node = treeNodes[treeNodeId];

    treeNodes[treeNodeId] = { ...node, ...action.payload };
  },
};
