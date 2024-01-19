import { actions } from './nodesSlice';

export const {
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
