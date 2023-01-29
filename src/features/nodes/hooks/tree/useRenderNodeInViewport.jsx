import { useSelector } from 'react-redux';
import useShallowEqualSelector from '../../../app/hooks/useShallowEqualSelector';

const CLIENT_HEIGHT_FACTOR = 3;

export default function useRenderNodeInViewport({ transformableId, allTreeNodes }) {
  const clientHeight = useSelector((state) => state.app.transformablePositionsById[transformableId]?.clientHeight);
  const scrollTop = useSelector((state) => state.app.transformablePositionsById[transformableId]?.scrollTop);
  const expandedTreeNodesById = useShallowEqualSelector((state) => state.nodes.expandedTreeNodesById);

  return allTreeNodes.filter((nodeProps) => {
    const nodeY = nodeProps.y;
    const isExpanded = expandedTreeNodesById[nodeProps.id];

    if (nodeProps.isRoot || isExpanded) return true;

    return nodeY > scrollTop - clientHeight * CLIENT_HEIGHT_FACTOR - 1
      && nodeY < scrollTop + clientHeight * CLIENT_HEIGHT_FACTOR;
  });
}
