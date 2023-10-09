import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectPosition, selectTreeNode } from '../../trees.selectors';
import { selectNode } from '../../../nodes/nodes.selectors';
import useShallowEqualSelector from '../../../../common/hooks/useShallowEqualSelector';
import useTreeContext from '../useTreeContext';
import useNodeButtonColors from './context/useNodeButtonColors';

const NodeContext = createContext(undefined);

export function useNodeContextCreator(contextProviderValue) {
  return {
    NodeContext,
    contextProviderValue,
  };
}

export default function useNodeContext() {
  const { treeNodeId, isAlreadyMounted } = useContext(NodeContext);

  // tree node attributes
  const {
    nodeId,
    treeParentId,
    treeAncestorIds,
    isCreationInProgress,
    isDragOver,
    isEditing,
    isExpanded,
    isTreeRoot,
  } = useSelector(selectTreeNode(treeNodeId));

  // node attributes
  const { rootNodeId: treeRootNodeId } = useTreeContext();

  const {
    rootId,
    parentId,
    persistentId,
    title,
    isRoot,
    isTemp,
    isSelected,
  } = useSelector(selectNode(nodeId));

  return {
    // tree node attributes
    nodeId,
    treeRootNodeId,
    treeParentId,
    treeNodeId,
    treeAncestorIds,
    isAlreadyMounted,
    isCreationInProgress,
    isDragOver,
    isEditing,
    isExpanded,
    isTreeRoot,
    // node attributes
    rootId,
    parentId,
    persistentId,
    title,
    isRoot,
    isTemp,
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
