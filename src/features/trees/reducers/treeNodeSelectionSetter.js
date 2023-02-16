// We select a tree node by setting its isSelected property to true.
// This way we avoid re-rendering the whole tree when we select a single node, compared to
// setting currentSelectedTreeNodeId in the state.
import { extractRootIdFromTreeNodeId } from '../trees.memoize';

export default {
  setSelectedTreeNode(state, action) {
    const { treeNodeId, value } = action.payload;
    const rootId = extractRootIdFromTreeNodeId(treeNodeId);
    const treeNodes = state.byRootNodeId[rootId];
    const prevCurrentNode = Object.values(treeNodes).find((node) => node.isSelected);

    if (prevCurrentNode) prevCurrentNode.isSelected = false;

    if (treeNodeId) treeNodes[treeNodeId].isSelected = value;
  },
};
