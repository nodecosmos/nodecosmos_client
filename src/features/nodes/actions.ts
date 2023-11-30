import { actions } from './nodesSlice';

export const {
    buildTmpNode,
    updateState,
    deleteFromState,
    select,
    search,
    setDragAndDrop,
    setNodePaneContent,
    setActionInProgress,
    collapseNode,
    expandNode,
    clearCurrentTmpNode,
} = actions;
