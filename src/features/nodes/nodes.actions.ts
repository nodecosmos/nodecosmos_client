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
    setSaveInProgress,
    clearJustCreatedNode,
    setNodeScrollTo,
    expandNode: expandNodeAction,
    collapseNode: collapseNodeAction,
    selectNodeFromParams,
    setScale,
    setDensity,
    setShowAncestorChain,
    setIndexSearchTerm,
} = actions;
