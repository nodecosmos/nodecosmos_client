import { actions } from './treesSlice';

export const {
    setDragAndDrop,
    clearDragAndDrop,
    setTreeLoading,
    setSelectedTreeNode,
    buildTreeFromRootNode,
    setTreeNodesPositions,
    expandTreeNode,
    collapseTreeNode,
    updateTreeNode,
    buildTmpTreeNode,
    deleteTreeNodeFromState,
    replaceTmpTreeNodeWithPersistedNode,
} = actions;

