import { actions } from './nodesSlice';

export const {
    clearNodeBranchData,
    buildTmpNode,
    replaceTmpNodeWithPersisted,
    updateState,
    deleteFromState,
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
    setShowTreeColors,
    setIndexSearchTerm,
    setSidebarOpen,
    pushRecentNode,
} = actions;
