import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import usePrevious from '../../../common/hooks/usePrevious';
import useShallowEqualSelector from '../../../common/hooks/useShallowEqualSelector';
import { selectTransformablePositionsById } from '../../app/app.selectors';
import { CLIENT_VIEWPORT_BUFFER_FACTOR } from '../trees.constants';
import {
  selectOrderedTreeNodeIds,
  selectPositionsByNodeId,
  selectTreeNodes,
} from '../trees.selectors';

export default function useTreeNodeVirtualization(rootId) {
  const { clientHeight, scrollTop } = useSelector(selectTransformablePositionsById(rootId));
  const orderedTreeNodeIds = useSelector(selectOrderedTreeNodeIds(rootId));

  const positionsById = useSelector(selectPositionsByNodeId);
  const treeNodes = useShallowEqualSelector(selectTreeNodes(rootId));

  const prevPositionsById = usePrevious(positionsById);
  const prevScrollTop = usePrevious(scrollTop);

  const prevVirtualizedNodesById = useRef({});
  const treeNodeIdsToViewRef = useRef([]);

  return useMemo(() => {
    /**
     * @description
     * Ensure it only runs when positionsById or scrollTop changes.
     * Otherwise, it will run on tree change (nodes expanded/collapsed, added/removed),
     * However, this one should only depend on positionsById and scrollTop.
     *
     * IDEA: Move positions calculation to slice, once tree is built,
     * and then again when nodes are expanded/collapsed, added/removed.
     */
    if (positionsById === prevPositionsById && scrollTop === prevScrollTop) {
      return treeNodeIdsToViewRef.current;
    }

    treeNodeIdsToViewRef.current = [];

    orderedTreeNodeIds.forEach((treeNodeId) => {
      const { y } = positionsById[treeNodeId] || {};
      const {
        isExpanded,
        isMounted,
        isTemp,
        treeParentId,
      } = treeNodes[treeNodeId];
      const isLastParentsChild = treeNodes[treeParentId]?.treeLastChildId === treeNodeId;

      const isInsideViewport = y > scrollTop - clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR - 1
          && y < scrollTop + clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR;

      if (isMounted && (isInsideViewport || isExpanded || isTemp || isLastParentsChild)) {
        // prevent animation if node is already mounted
        const alreadyMounted = prevVirtualizedNodesById.current[treeNodeId];

        treeNodeIdsToViewRef.current.push([treeNodeId, !alreadyMounted]);
      }

      prevVirtualizedNodesById.current[treeNodeId] = isMounted;
    });

    return treeNodeIdsToViewRef.current;
  }, [positionsById, prevPositionsById, scrollTop, prevScrollTop, orderedTreeNodeIds, treeNodes, clientHeight]);
}
