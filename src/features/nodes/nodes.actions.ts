import { actions } from './nodesSlice';

export const {
    clearBranchData,
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
} = actions;
