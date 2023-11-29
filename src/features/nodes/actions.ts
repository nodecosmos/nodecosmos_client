import { actions } from './nodesSlice';

export const {
    buildTmpNode,
    updateState,
    deleteFromState,
    select,
    search,
    replaceTmpWithPersisted,
    setDragAndDrop,
    setNodePaneContent,
    setActionInProgress,
    collapseNode,
    expandNode,
    clearCurrentTmpNode,
} = actions;
