import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useShallowEqualSelector from '../../../common/hooks/useShallowEqualSelector';
import { COMPLETE_Y_LENGTH, EDGE_LENGTH, MARGIN_LEFT } from '../../components/tree/constants';

const CLIENT_VIEWPORT_BUFFER_FACTOR = 2;

export default function useTreePositionCalculator(id) {
  const nestedNodesByParentId = useShallowEqualSelector((state) => state.nodes.nestedNodesByParentId);
  const mountedTreeNodesById = useShallowEqualSelector((state) => state.nodes.mountedTreeNodesById);
  const expandedTreeNodesById = useShallowEqualSelector((state) => state.nodes.expandedTreeNodesById);
  const currentTempNodeId = useSelector((state) => state.nodes.currentTempNodeId);

  const clientHeight = useSelector((state) => state.app.transformablePositionsById[id]?.clientHeight);
  const scrollTop = useSelector((state) => state.app.transformablePositionsById[id]?.scrollTop);

  return useMemo(() => {
    const currentAllTreeNodes = [];
    const currentPositionsById = {};
    const viewportNodes = [];

    // simple virtualization - only render nodes that are in the viewport (plus a buffer)
    const addViewportNode = (nodeProps) => {
      const isNewlyAddedNode = currentTempNodeId === nodeProps.id;
      const isExpanded = expandedTreeNodesById[nodeProps.id];

      if (isNewlyAddedNode || isExpanded) {
        viewportNodes.push(nodeProps);
        return;
      }

      const { y } = currentPositionsById[nodeProps.id];
      const isInsideViewport = y > scrollTop - clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR - 1
        && y < scrollTop + clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR;

      if (isInsideViewport) viewportNodes.push(nodeProps);
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

      // set position & update parent's yEnds
      const isMounted = mountedTreeNodesById[nodeProps.id];

      if (parentId && isMounted) {
        ancestorIds.forEach((ancestorId) => { currentPositionsById[ancestorId].yEnds = position.yEnds; });
      }

      currentPositionsById[nodeProps.id] = position;
    };

    // recursively calculates the position of a node and its children top-down
    const renderNodesAsFlatArray = (
      nodeId = id,
      nestedLevel = 0,
      currentUpperSiblingId = null,
      parentId = null,
      ancestorIds = [],
    ) => {
      const childrenIds = nestedNodesByParentId[nodeId];

      const nodeProps = {
        id: nodeId,
        nestedLevel,
        upperSiblingId: currentUpperSiblingId,
        lastChildId: childrenIds[childrenIds.length - 1],
        isRoot: nodeId === id,
      };

      calculatePosition(nodeProps, currentUpperSiblingId, parentId, ancestorIds);
      addViewportNode(nodeProps);
      currentAllTreeNodes.push(nodeProps);

      if (childrenIds) {
        ancestorIds.push(nodeId);
        childrenIds.forEach((nestedNodeId, index) => {
          const upperSiblingId = childrenIds[index - 1];
          renderNodesAsFlatArray(nestedNodeId, nestedLevel + 1, upperSiblingId, nodeId, ancestorIds);
        });
      }
    };

    renderNodesAsFlatArray();

    return { allTreeNodes: currentAllTreeNodes, positionsById: currentPositionsById, viewportNodes };
  }, [
    clientHeight, currentTempNodeId, expandedTreeNodesById, id, mountedTreeNodesById, nestedNodesByParentId, scrollTop,
  ]);
}
