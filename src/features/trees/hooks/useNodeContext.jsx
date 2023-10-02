import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectPosition, selectTreeNode } from '../trees.selectors';
import { selectNode } from '../../nodes/nodes.selectors';
import useShallowEqualSelector from '../../../common/hooks/useShallowEqualSelector';
import { useTreeRootNodeId } from './useTreeContext';
import useNodeButtonColors from './useNodeButtonColors';

const NodeContext = createContext(undefined);

export function useNodeContextCreator(contextProviderValue) {
  return {
    NodeContext,
    contextProviderValue,
  };
}

export default function useNodeContext() {
  const { treeNodeId, alreadyMounted } = useContext(NodeContext);

  // tree node attributes
  const {
    isExpanded,
    isEditing,
    isTreeRoot,
    nodeId,
  } = useSelector(selectTreeNode(treeNodeId));

  // node attributes
  const treeRootNodeId = useTreeRootNodeId();

  const {
    isRoot,
    title,
    parentId,
    ancestorIds,
    rootId,
    isSelected,
  } = useSelector(selectNode(nodeId));

  return {
    // tree node attributes
    treeNodeId,
    alreadyMounted,
    isExpanded,
    isEditing,
    isTreeRoot,
    nodeId,
    treeRootNodeId,
    // node attributes
    isRoot,
    title,
    parentId,
    ancestorIds,
    rootId,
    isSelected,
  };
}

export function useNodePosition() {
  const { treeRootNodeId, treeNodeId } = useNodeContext();
  return useShallowEqualSelector(selectPosition(treeRootNodeId, treeNodeId));
}

export function useNodeColors() {
  const { treeNodeId } = useNodeContext();
  return useNodeButtonColors(treeNodeId);
}
