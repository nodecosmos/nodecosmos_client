import { actions } from './nodesSlice';

// we use separate file for actions to avoid name collisions
export const {
    updateNodeState,
    deleteNodeFromState,
    buildTmpNode,
    setSelectedNode,
    setNodePaneContent,
    reorderNodes,
    searchNode,
    // importNode,
    replaceTmpNodeWithPersistedNode,
    setIsNodeActionInProgress,
} = actions;
