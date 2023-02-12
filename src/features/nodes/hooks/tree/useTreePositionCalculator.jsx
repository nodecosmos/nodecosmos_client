import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectTransformablePositionsById } from '../../../app/app.selectors';
import { COMPLETE_Y_LENGTH, EDGE_LENGTH, MARGIN_LEFT } from '../../components/tree/constants';
import {
  selectchildIdsByParentId,
  selectCurrentTmpNodeId,
  selectExpandedTreeNodesById,
  selectMountedTreeNodesById,
} from '../../nodes.selectors';

const CLIENT_VIEWPORT_BUFFER_FACTOR = 2;

export default function useTreePositionCalculator(id) {
  const childIdsByParentId = useSelector(selectchildIdsByParentId);
  const mountedTreeNodesById = useSelector(selectMountedTreeNodesById);
  const expandedTreeNodesById = useSelector(selectExpandedTreeNodesById);
  const currentTempNodeId = useSelector(selectCurrentTmpNodeId);

  const {
    clientHeight,
    scrollTop,
  } = useSelector(selectTransformablePositionsById(id));

  return useMemo(
    () => {
      const currentPositionsById = {};
      const viewportNodes = [];

      // simple virtualization - only render nodes that are in the viewport (plus a buffer)
      const addViewportNode = (nodeProps) => {
        const { y } = currentPositionsById[nodeProps.id];

        const isNewlyAddedNode = currentTempNodeId === nodeProps.id;
        const isExpanded = expandedTreeNodesById[nodeProps.id];
        const isInsideViewport = y > scrollTop - clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR - 1
        && y < scrollTop + clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR;

        if (isInsideViewport || isNewlyAddedNode || isExpanded) viewportNodes.push(nodeProps);
      };

      // calculates the position of a node based on its parent's or upper sibling's position
      const calculatePosition = (nodeProps, upperSiblingId, parentId, ancestorIds) => {
        const parentX = parentId ? currentPositionsById[parentId].x : 0;
        const parentY = parentId ? currentPositionsById[parentId].y : 0;

        const upperSiblingYEnds = currentPositionsById[upperSiblingId]?.yEnds;

        const position = {};

        position.x = parentX + MARGIN_LEFT + EDGE_LENGTH;
        position.xEnds = position.x + EDGE_LENGTH;

        position.y = (upperSiblingYEnds || parentY) + COMPLETE_Y_LENGTH;
        position.yEnds = position.y;

        const isMounted = mountedTreeNodesById[nodeProps.id];
        if (parentId && isMounted) {
          ancestorIds.forEach((ancestorId) => {
            currentPositionsById[ancestorId].yEnds = position.yEnds;
          });
        }

        currentPositionsById[nodeProps.id] = position;
      };

      // recursively calculates the position of a node and its children top-down
      const calculateNodePosition = (
        nodeId = id,
        nestedLevel = 0,
        currentUpperSiblingId = null,
        parentId = null,
        ancestorIds = [],
      ) => {
        const childIds = childIdsByParentId[nodeId];

        const nodeProps = {
          id: nodeId,
          nestedLevel,
          upperSiblingId: currentUpperSiblingId,
          lastChildId: childIds[childIds.length - 1],
          isRoot: nodeId === id,
        };

        calculatePosition(nodeProps, currentUpperSiblingId, parentId, ancestorIds);
        addViewportNode(nodeProps);

        if (childIds) {
          ancestorIds.push(nodeId);
          childIds.forEach((nestedNodeId, index) => {
            const upperSiblingId = childIds[index - 1];
            calculateNodePosition(nestedNodeId, nestedLevel + 1, upperSiblingId, nodeId, ancestorIds);
          });
        }
      };

      calculateNodePosition();

      return {
        positionsById: currentPositionsById,
        viewportNodes,
      };
    },
    [
      clientHeight,
      currentTempNodeId,
      expandedTreeNodesById,
      id,
      mountedTreeNodesById,
      childIdsByParentId,
      scrollTop,
    ],
  );
}
