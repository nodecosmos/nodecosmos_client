import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectPosition, selectTreeNodeAttribute } from '../trees.selectors';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
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
  const isExpanded = useSelector(selectTreeNodeAttribute(treeNodeId, 'isExpanded'));
  const isEditing = useSelector(selectTreeNodeAttribute(treeNodeId, 'isEditing'));
  const isTreeRoot = useSelector(selectTreeNodeAttribute(treeNodeId, 'isRoot'));
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));

  // node attributes
  const rootNodeId = useTreeRootNodeId();
  const isRoot = useSelector(selectNodeAttribute(nodeId, 'isRoot'));
  const title = useSelector(selectNodeAttribute(nodeId, 'title'));
  const parentId = useSelector(selectNodeAttribute(nodeId, 'parentId'));
  const ancestorIds = useSelector(selectNodeAttribute(nodeId, 'ancestorIds'));
  const rootId = useSelector(selectNodeAttribute(nodeId, 'rootId'));
  const isSelected = useSelector(selectNodeAttribute(nodeId, 'isSelected'));

  return {
    // tree node attributes
    treeNodeId,
    alreadyMounted,
    isExpanded,
    isEditing,
    isTreeRoot,
    nodeId,
    rootNodeId,
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
  const { rootId, treeNodeId } = useNodeContext();
  return useSelector(selectPosition(rootId, treeNodeId));
}

export function useNodeColors() {
  const { treeNodeId } = useNodeContext();
  return useNodeButtonColors(treeNodeId);
}
