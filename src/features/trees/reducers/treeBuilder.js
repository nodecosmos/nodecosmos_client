import { TREES_TYPES } from '../trees.constants';

export default function buildTreeFromRootNode(state, action) {
    const {
        rootId, childIdsByParentId, type,
    } = action.payload;

    state.byRootNodeId[rootId] ||= {};
    state.orderedTreeNodeIdsByRootNodeId[rootId] = [];

    if (!childIdsByParentId || !childIdsByParentId[rootId]) return;

    const stack = [{
        nodeId: rootId,
        treeNodeId: rootId,
        parentId: null,
        treeParentId: null,
        treeUpperSiblingId: null,
        treeAncestorIds: [],
        treeSiblingIndex: 0,
        nestedLevel: 0,
    }];

    while (stack.length > 0) {
        const {
            nodeId,
            treeNodeId,
            // parentId,
            treeParentId,
            treeUpperSiblingId,
            treeAncestorIds,
            treeSiblingIndex,
            nestedLevel,
        } = stack.pop();

        const childIds = childIdsByParentId[nodeId];

        const isRoot = nodeId === rootId;
        const isNewlyCreated = state.currentTempNodeId === nodeId;

        state.orderedTreeNodeIdsByRootNodeId[rootId].push(treeNodeId);

        const parent = state.byRootNodeId[rootId][treeParentId];
        const isParentExpanded = isRoot || parent.isExpanded;
        const isParentMounted = isRoot || parent.isMounted;

        let currentTreeNode = state.byRootNodeId[rootId][treeNodeId] || {};
        currentTreeNode = {
            treeNodeId,
            treeParentId,
            treeUpperSiblingId,
            treeAncestorIds,
            treeSiblingIndex,
            treeChildIds: new Array(childIds.length),
            treeDescendantIds: [],
            treeLastChildId: null,
            nodeId,
            rootId,
            isRoot,
            isMounted: isRoot || isNewlyCreated || (isParentExpanded && isParentMounted),
            isExpanded: currentTreeNode.isExpanded || isRoot || type === TREES_TYPES.checkbox,
            isEditing: isNewlyCreated || false,
            isNewlyCreated,
            nestedLevel,
        };

        // reversely push children to stack so that we can pop them in order
        // and have them in correct order in the tree
        for (let i = childIds.length - 1; i >= 0; i -= 1) {
            const childTreeNodeId = `${rootId}->${nodeId}->${childIds[i]}`;

            currentTreeNode.treeChildIds[i] = childTreeNodeId;

            if (i === childIds.length - 1) {
                currentTreeNode.treeLastChildId = childTreeNodeId;
            }

            stack.push({
                nodeId: childIds[i],
                treeNodeId: childTreeNodeId,
                parentId: nodeId,
                treeParentId: treeNodeId,
                treeUpperSiblingId: i > 0 ? `${rootId}->${nodeId}->${childIds[i - 1]}` : null,
                treeAncestorIds: [...treeAncestorIds, treeNodeId],
                nestedLevel: nestedLevel + 1,
                treeSiblingIndex: i,
            });
        }

        state.byRootNodeId[rootId][treeNodeId] = currentTreeNode;

        // update treeDescendantIds for all ancestors
        treeAncestorIds.forEach((ancestorId) => {
            state.byRootNodeId[rootId][ancestorId].treeDescendantIds.push(treeNodeId);
        });
    }
}
