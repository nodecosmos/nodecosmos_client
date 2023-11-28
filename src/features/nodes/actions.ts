import { actions } from './nodesSlice';

export const {
    buildTmpNode,
    updateState,
    deleteFromState,
    select,
    search,
    replaceTmpWithPersisted,
    clearTmp,
    setDragAndDrop,
    setNodePaneContent,
    setActionInProgress,
    collapseNode,
    expandNode,
} = actions;
