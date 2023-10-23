export default {
    replaceTmpTreeNodeWithPersistedNode(state, action) {
        const {
            treeRootNodeId, tmpTreeNodeId, tmpNodeId, persistentId,
        } = action.payload;
        const treeNodeId = tmpTreeNodeId.replace(tmpNodeId, persistentId);
        const tmpTreeNode = state.byRootNodeId[treeRootNodeId][tmpTreeNodeId];

        state.byRootNodeId[treeRootNodeId][treeNodeId] = {
            ...tmpTreeNode,
            treeNodeId,
            nodeId: persistentId,
            isTemp: false,
            isNewlyCreated: false,
            isEditing: false,
        };
        state.byRootNodeId[treeRootNodeId][treeNodeId].treeNodeId = treeNodeId;

        const orderedTreeNodeIds = state.orderedTreeNodeIdsByRootNodeId[treeRootNodeId];

        state.orderedTreeNodeIdsByRootNodeId[treeRootNodeId] = orderedTreeNodeIds.map(
            (id) => (id === tmpTreeNodeId ? treeNodeId : id),
        );

        // handle parent
        const { treeParentId } = state.byRootNodeId[treeRootNodeId][treeNodeId];
        const parent = state.byRootNodeId[treeRootNodeId][treeParentId];

        state.byRootNodeId[treeRootNodeId][treeParentId] = {
            ...parent,
            treeChildIds: parent.treeChildIds.map((id) => (id === tmpTreeNodeId ? treeNodeId : id)),
            treeLastChildId: parent.treeLastChildId === tmpTreeNodeId ? treeNodeId : parent.treeLastChildId,
        };

        // handle ancestors' descendants
        tmpTreeNode.treeAncestorIds.forEach((ancestorId) => {
            const ancestorTreeNode = state.byRootNodeId[treeRootNodeId][ancestorId];
            state.byRootNodeId[treeRootNodeId][ancestorId].treeDescendantIds = ancestorTreeNode.treeDescendantIds.map(
                (id) => (id === tmpTreeNodeId ? treeNodeId : id),
            );
        });

        // delete tmp node
        delete state.byRootNodeId[treeRootNodeId][tmpTreeNodeId];

        // update upperSiblingId of bottom sibling
        if (state.byRootNodeId[treeRootNodeId][treeParentId].treeChildIds.length > 0) {
            const nodeIndex = state.byRootNodeId[treeRootNodeId][treeParentId].treeChildIds.indexOf(treeNodeId);
            const bottomSiblingId = state.byRootNodeId[treeRootNodeId][treeParentId].treeChildIds[nodeIndex + 1];

            if (bottomSiblingId) {
                state.byRootNodeId[treeRootNodeId][bottomSiblingId].treeUpperSiblingId = treeNodeId;
            }
        }
    },
};
