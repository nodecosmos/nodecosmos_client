import { useSelector } from 'react-redux';
import useShallowEqualSelector from '../../../app/hooks/useShallowEqualSelector';

export default function useRenderNodeInViewport({ transformableId, allTreeNodes }) {
  const clientHeight = useSelector((state) => state.app.transformablePositionsById[transformableId]?.clientHeight);
  const scrollTop = useSelector((state) => state.app.transformablePositionsById[transformableId]?.scrollTop);
  const expandedTreeNodesById = useShallowEqualSelector((state) => state.nodes.expandedTreeNodesById);

  return allTreeNodes.filter((nodeProps) => {
    const nodeY = nodeProps.y;
    const isExpanded = expandedTreeNodesById[nodeProps.id];

    return nodeProps.isRoot || isExpanded || (nodeY > scrollTop - clientHeight && nodeY < scrollTop + clientHeight * 2);
  });
}
