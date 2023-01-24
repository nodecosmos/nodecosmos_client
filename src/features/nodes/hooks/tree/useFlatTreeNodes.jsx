import { useMemo } from 'react';
import useShallowEqualSelector from '../../../app/hooks/useShallowEqualSelector';

export default function useFlatTreeNodes(id) {
  const childrenIdsByNodeId = useShallowEqualSelector((state) => {
    const result = {};
    Object.keys(state.nodes).forEach((nodeId) => {
      const node = state.nodes[nodeId];

      result[nodeId] = node.node_ids;
    });
    return result;
  });

  return useMemo(() => {
    const allTreeNodes = [];

    const renderNodesAsFlatArray = (nodeId = id, nestedLevel = 0, currentUpperSiblingId = null) => {
      const childrenIds = childrenIdsByNodeId[nodeId];

      allTreeNodes.push(
        {
          id: nodeId,
          nestedLevel,
          upperSiblingId: currentUpperSiblingId,
          lastChildId: childrenIds[childrenIds.length - 1],
        },
      );

      if (childrenIds) {
        childrenIds.forEach((nestedNodeId, index) => {
          const upperSiblingId = childrenIds[index - 1];
          renderNodesAsFlatArray(nestedNodeId, nestedLevel + 1, upperSiblingId);
        });
      }
    };

    renderNodesAsFlatArray();

    return allTreeNodes;
  }, [id, childrenIdsByNodeId]);
}
