import { useSelector } from 'react-redux';
import colors from '../../../../themes/light';

// FIXME: currently it's  dumb implementation
export default function useNodeButtonBackground(props) {
  const {
    id, isRoot, nestedLevel,
  } = props;

  const parentID = useSelector((state) => state.nodes[id].parent_id);
  const nodeExpanded = useSelector((state) => state.nodes[id].expanded);
  const parentExpanded = useSelector((state) => !isRoot && state.nodes[parentID].expanded);

  const currentNodeId = useSelector((state) => state.app.currentNodeId);
  const isCurrentNode = nodeExpanded && id === currentNodeId;
  const hasNestedNodes = useSelector((state) => state.nodes[id].node_ids.length > 0);

  const nodeBackgroundColors = [colors.red2, colors.green2, colors.blue2];
  const backgroundColor = ((nodeExpanded && isCurrentNode) || (nodeExpanded && hasNestedNodes))
    ? nodeBackgroundColors[nestedLevel % 3] : '#414650';
  const parentBackgroundColor = parentExpanded ? nodeBackgroundColors[(nestedLevel - 1) % 3] : '#414650';

  return {
    backgroundColor,
    parentBackgroundColor,
  };
}
