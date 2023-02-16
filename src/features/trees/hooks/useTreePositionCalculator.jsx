import { useMemo } from 'react';
import { useSelector } from 'react-redux';
/* nodecosmos */
import { COMPLETE_Y_LENGTH, EDGE_LENGTH, MARGIN_LEFT } from '../trees.constants';
import {
  selectOrderedTreeNodeIds,
  selectTreeNodes,
} from '../trees.selectors';

export default function useTreePositionCalculator(rootId) {
  const treeNodes = useSelector(selectTreeNodes(rootId));
  const orderedTreeNodeIds = useSelector(selectOrderedTreeNodeIds(rootId));

  return useMemo(
    () => {
      const currentPositionsById = {};

      // calculates the position of a node based on its parent's or upper sibling's position
      orderedTreeNodeIds.forEach((treeNodeId) => {
        const node = treeNodes[treeNodeId];

        const {
          treeUpperSiblingId,
          treeParentId,
          treeAncestorIds,
        } = node;

        const parentX = treeParentId ? currentPositionsById[treeParentId].x : 0;
        const parentY = treeParentId ? currentPositionsById[treeParentId].y : 0;

        const upperSiblingYEnd = treeUpperSiblingId && currentPositionsById[treeUpperSiblingId].yEnd;

        const position = {};

        position.x = parentX + MARGIN_LEFT + EDGE_LENGTH;
        position.xEnd = position.x + EDGE_LENGTH;

        position.y = (upperSiblingYEnd || parentY) + COMPLETE_Y_LENGTH;
        position.yEnd = position.y;

        if (node.isMounted) {
          treeAncestorIds.forEach((ancestorId) => {
            currentPositionsById[ancestorId].yEnd += COMPLETE_Y_LENGTH;
          });
        }

        currentPositionsById[node.treeNodeId] = position;
      });

      return currentPositionsById;
    },
    [orderedTreeNodeIds, treeNodes],
  );
}
