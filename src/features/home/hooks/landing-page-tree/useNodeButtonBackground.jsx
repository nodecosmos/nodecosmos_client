import { useSelector } from 'react-redux';
import colors from '../../../../themes/light';

// FIXME: currently it's  dumb implementation
export default function useNodeButtonBackground(props) {
  const {
    id, isRoot, nestedLevel,
  } = props;

  const parentID = useSelector((state) => state.landingPageNodes[id].parent_id);
  const nodeExpanded = useSelector((state) => state.landingPageNodes[id].expanded);
  const parentExpanded = useSelector((state) => !isRoot && state.landingPageNodes[parentID].expanded);

  const currentNodeID = useSelector((state) => state.app.currentNodeID);
  const isCurrentNode = nodeExpanded && id === currentNodeID;
  const hasNestedNodes = useSelector((state) => state.landingPageNodes[id].node_ids.length > 0);

  const nodeBackgroundColors = [colors.red2, colors.green2, colors.blue2];
  const backgroundColor = (nodeExpanded && isCurrentNode) || hasNestedNodes
    ? nodeBackgroundColors[nestedLevel % 3] : '#414650';
  const parentBackgroundColor = parentExpanded ? nodeBackgroundColors[(nestedLevel - 1) % 3] : '#414650';
  const color = (nodeExpanded && isCurrentNode) || hasNestedNodes ? 'rgb(0 0 0 / 90%)' : '#fff';

  return {
    backgroundColor,
    parentBackgroundColor,
    color,
  };
}
