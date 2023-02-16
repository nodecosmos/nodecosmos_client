import { useMemo } from 'react';
import { useSelector } from 'react-redux';
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
  const treeNodes = useSelector(selectTreeNodes(rootId));

  return useMemo(() => {
    const treeNodeIdsToView = [];

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
        treeNodeIdsToView.push(treeNodeId);
      }
    });

    return treeNodeIdsToView;
  }, [orderedTreeNodeIds, positionsById, treeNodes, clientHeight, scrollTop]);
}
