import { extractRootIdFromTreeNodeId } from '../trees.memoize';

const mountDescendants = (state, treeNode) => {
    const { treeDescendantIds, rootId } = treeNode;
    const rootNodesById = state.byRootNodeId[rootId];

    treeDescendantIds.forEach((id) => {
        const { treeAncestorIds } = rootNodesById[id];

        // mount node if all ancestors are expanded
        rootNodesById[id].isMounted = treeAncestorIds.every(
            (ancestorId) => rootNodesById[ancestorId].isExpanded,
        );
    });
};

const unMountNodes = (state, treeNode) => {
    const { treeDescendantIds, rootId } = treeNode;
    const rootNodesById = state.byRootNodeId[rootId];

    treeDescendantIds.forEach((id) => { rootNodesById[id].isMounted = false; });
};

export function expandTreeNode(state, action) {
    const treeNodeId = action.payload;
    const rootId = extractRootIdFromTreeNodeId(treeNodeId);

    const treeNode = state.byRootNodeId[rootId][treeNodeId];

    treeNode.isExpanded = true;

    mountDescendants(state, treeNode);
}

export function collapseTreeNode(state, action) {
    const treeNodeId = action.payload;
    const rootId = extractRootIdFromTreeNodeId(treeNodeId);

    const treeNode = state.byRootNodeId[rootId][treeNodeId];

    treeNode.isExpanded = false;

    unMountNodes(state, treeNode);
}
