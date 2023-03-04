import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectNodesById } from '../../nodes/nodes.selectors';
import { selectOrderedTreeNodeIds, selectSearchTerm, selectTreeNodes } from '../trees.selectors';

export default function useTreeNodeFilterer(rootId) {
  const searchTerm = useSelector(selectSearchTerm);
  const treeNodes = useSelector(selectTreeNodes(rootId));
  const nodes = useSelector(selectNodesById);
  const orderedTreeNodeIds = useSelector(selectOrderedTreeNodeIds(rootId));

  return useMemo(() => {
    // return nodes and it's ancestors that match the search term

    if (!searchTerm || !treeNodes) return orderedTreeNodeIds;
    const currentOrderedTreeNodeIds = [];
    const addedNodesById = {};

    Object.keys(treeNodes).forEach((treeNodeId) => {
      const treeNode = treeNodes[treeNodeId];
      const node = nodes[treeNode.nodeId];
      const { treeAncestorIds } = treeNode;

      if (node.title.includes(searchTerm)) {
        treeAncestorIds.forEach((treeAncestorId) => {
          if (!addedNodesById[treeAncestorId]) {
            currentOrderedTreeNodeIds.push(treeAncestorId);
            addedNodesById[treeAncestorId] = true;
          }
        });

        if (!addedNodesById[treeNode.nodeId]) {
          currentOrderedTreeNodeIds.push(treeNodeId);
          addedNodesById[treeNode.nodeId] = true;
        }
      }
    });

    return currentOrderedTreeNodeIds;
  }, [nodes, orderedTreeNodeIds, searchTerm, treeNodes]);
}
