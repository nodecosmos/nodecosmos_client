import { actions } from './nodesSlice';

export const {
    clearNodeBranchData,
    buildTmpNode,
    replaceTmpNodeWithPersisted,
    updateState,
    deleteFromState,
    select,
    search,
    setDragAndDrop,
    setNodePaneContent,
    setSaveInProgress,
    clearJustCreatedNode,
    setNodeScrollTo,
} = actions;
