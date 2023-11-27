import { actions } from './nodesSlice';

export const {
    buildTmpNode,
    updateState,
    deleteFromState,
    select,
    search,
    reorder,
    replaceTmpWithPersisted,
    clearTmp,
    setNodePaneContent,
    setActionInProgress,
} = actions;
