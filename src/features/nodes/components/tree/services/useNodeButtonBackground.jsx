import { useSelector } from 'react-redux';
import colors from '../../../../../themes/light';

// TODO: just dumb implementation
export default function useNodeButtonBackground(props) {
  const {
    id, nestedLevel, parentID, isRoot,
  } = props;

  const nodeExpanded = useSelector((state) => state.nodes[id].expanded);
  const parentExpanded = useSelector((state) => !isRoot && state.nodes[parentID].expanded);

  const nodeBackgroundColors = [colors.red2, colors.green2, colors.blue2];
  const backgroundColor = nodeExpanded ? nodeBackgroundColors[nestedLevel % 3] : '#43464e';
  const parentBackgroundColor = parentExpanded ? nodeBackgroundColors[(nestedLevel - 1) % 3] : '#43464e';

  return {
    backgroundColor,
    parentBackgroundColor,
  };
}
