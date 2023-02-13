import { useMemo } from 'react';
import { useSelector } from 'react-redux';
/* nodecosmos */
import { selectTransformablePositionsById } from '../../app/app.selectors';
import { COMPLETE_Y_LENGTH, EDGE_LENGTH, MARGIN_LEFT } from '../trees.constants';
import {
  selectOrderedTreeNodeIdsByRootNodeId,
  selectTreeNodesByRootNodeId,
} from '../trees.selectors';

const CLIENT_VIEWPORT_BUFFER_FACTOR = 2;

export default function useTreePositionCalculator(rootNodeId) {
  const treeNodes = useSelector(selectTreeNodesByRootNodeId(rootNodeId));
  const orderedTreeNodeIds = useSelector(selectOrderedTreeNodeIdsByRootNodeId(rootNodeId));

  const { clientHeight, scrollTop } = useSelector(selectTransformablePositionsById(rootNodeId));

  return useMemo(
    () => {
      const currentPositionsById = {};
      const nodesToView = [];

      orderedTreeNodeIds.forEach((treeNodeId) => {
        const node = treeNodes[treeNodeId];

        calculatePosition(node); // first calculate the position of the node
        addNodesToView(node); // then add it to the list of nodes to view
      });

      // simple filtering & virtualization
      function addNodesToView(node) {
        const { y } = currentPositionsById[node.treeNodeId];
        const { isExpanded, isMounted } = treeNodes[node.treeNodeId];

        const isInsideViewport = y > scrollTop - clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR - 1
          && y < scrollTop + clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR;

        if (isMounted && (isInsideViewport || isExpanded || node.isNewlyAddedNode)) {
          nodesToView.push(node.treeNodeId);
        }
      }

      // calculates the position of a node based on its parent's or upper sibling's position
      function calculatePosition(node) {
        const { treeUpperSiblingId, treeParentId, treeAncestorIds } = node;
        const parentLastChildId = treeParentId && treeNodes[treeParentId].treeLastChildId;

        const parentX = treeParentId ? currentPositionsById[treeParentId].x : 0;
        const parentY = treeParentId ? currentPositionsById[treeParentId].y : 0;

        const upperSiblingYEnd = treeUpperSiblingId && currentPositionsById[treeUpperSiblingId].yEnd;

        const position = {};

        position.x = parentX + MARGIN_LEFT + EDGE_LENGTH;
        position.xEnd = position.x + EDGE_LENGTH;

        position.y = (upperSiblingYEnd || parentY) + COMPLETE_Y_LENGTH;
        position.yEnd = position.y;

        if (node.isMounted && node.treeNodeId === parentLastChildId) {
          treeAncestorIds.forEach((ancestorId) => {
            currentPositionsById[ancestorId].yEnd = position.yEnd;
          });
        }

        currentPositionsById[node.treeNodeId] = position;
      }

      return {
        positionsById: currentPositionsById,
        nodesToView,
      };
    },
    [clientHeight, orderedTreeNodeIds, scrollTop, treeNodes],
  );
}
