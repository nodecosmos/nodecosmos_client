import { useMemo } from 'react';
import useShallowEqualSelector from '../../../app/hooks/useShallowEqualSelector';
import { COMPLETE_Y_LENGTH, EDGE_LENGTH, MARGIN_LEFT } from '../../components/tree/constants';

export default function useTreePositionCalculator(id) {
  const nestedNodesByParentId = useShallowEqualSelector((state) => state.nodes.nestedNodesByParentId);
  const mountedTreeNodesById = useShallowEqualSelector((state) => state.nodes.mountedTreeNodesById);

  return useMemo(() => {
    const currentAllTreeNodes = [];
    const currentPositionsById = {};

    const setInitialPosition = (nodeId, upperSiblingId, parentId, ancestorIds) => {
      const parentX = parentId ? currentPositionsById[parentId].x : 0;
      const parentY = parentId ? currentPositionsById[parentId].y : 0;

      const upperSiblingYEnds = upperSiblingId && currentPositionsById[upperSiblingId].yEnds;

      const position = {};

      position.x = position.isRoot ? EDGE_LENGTH : (parentX + MARGIN_LEFT + EDGE_LENGTH);
      position.xEnds = position.x + EDGE_LENGTH;

      position.y = (position.isRoot ? 0 : (upperSiblingYEnds || parentY)) + COMPLETE_Y_LENGTH;
      position.yEnds = position.y;

      // set position & update parent's yEnds
      const isMounted = mountedTreeNodesById[nodeId];

      if (parentId && isMounted) {
        ancestorIds.forEach((ancestorId) => { currentPositionsById[ancestorId].yEnds = position.yEnds; });
      }

      currentPositionsById[nodeId] = position;
    };

    const renderNodesAsFlatArray = (
      nodeId = id,
      nestedLevel = 0,
      currentUpperSiblingId = null,
      parentId = null,
      ancestorIds = [],
    ) => {
      setInitialPosition(nodeId, currentUpperSiblingId, parentId, ancestorIds);

      const childrenIds = nestedNodesByParentId[nodeId];

      currentAllTreeNodes.push(
        {
          id: nodeId,
          nestedLevel,
          upperSiblingId: currentUpperSiblingId,
          lastChildId: childrenIds[childrenIds.length - 1],
          isRoot: nodeId === id,
          y: currentPositionsById[nodeId].y,
        },
      );

      if (childrenIds) {
        ancestorIds.push(nodeId);
        childrenIds.forEach((nestedNodeId, index) => {
          const upperSiblingId = childrenIds[index - 1];
          renderNodesAsFlatArray(nestedNodeId, nestedLevel + 1, upperSiblingId, nodeId, ancestorIds);
        });
      }
    };

    renderNodesAsFlatArray();

    return { allTreeNodes: currentAllTreeNodes, positionsById: currentPositionsById };
  }, [id, mountedTreeNodesById, nestedNodesByParentId]);
}
