import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectOrderedTreeNodeIds, selectTreeNodes } from '../trees.selectors';
import useIsInsideViewport from './tree-nodes-virtualizer/useIsInsideViewport';

export default function useTreeNodeVirtualizer(rootId) {
  const orderedTreeNodeIds = useSelector(selectOrderedTreeNodeIds(rootId));

  const treeNodes = useSelector(selectTreeNodes(rootId));
  const isInViewport = useIsInsideViewport(rootId);

  const prevVirtualizedNodesById = useRef({});
  const treeNodeIdsToViewRef = useRef([]);

  return useMemo(() => {
    treeNodeIdsToViewRef.current = [];

    orderedTreeNodeIds.forEach((treeNodeId) => {
      const {
        isExpanded,
        isMounted,
        treeParentId,
        isNewlyCreated,
      } = treeNodes[treeNodeId];
      const isLastParentsChild = treeNodes[treeParentId]?.treeLastChildId === treeNodeId;

      if (isMounted && (isInViewport(treeNodeId) || isExpanded || isLastParentsChild)) {
        // prevent animation if node is already mounted,
        // so we don't animate nodes that are outside of viewport
        let alreadyMounted = prevVirtualizedNodesById.current[treeNodeId];
        if (isNewlyCreated) alreadyMounted = false;

        treeNodeIdsToViewRef.current.push([treeNodeId, alreadyMounted]);
      }

      prevVirtualizedNodesById.current[treeNodeId] = isMounted;
    });

    return treeNodeIdsToViewRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderedTreeNodeIds, isInViewport]);
}
