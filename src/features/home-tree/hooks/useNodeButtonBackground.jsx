import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

// FIXME: currently it's  dumb implementation
export default function useNodeButtonBackground(props) {
  const {
    id, isRoot, nestedLevel,
  } = props;

  const theme = useTheme();

  const parentID = useSelector((state) => state.landingPageNodes[id].parent_id);
  const nodeExpanded = useSelector((state) => state.landingPageNodes[id].expanded);
  const parentExpanded = useSelector((state) => !isRoot && state.landingPageNodes[parentID].expanded);

  const currentNodeId = useSelector((state) => state.app.currentNodeId);
  const isCurrentNode = nodeExpanded && id === currentNodeId;
  const hasNestedNodes = useSelector((state) => state.landingPageNodes[id].node_ids.length > 0);

  const hasBg = (nodeExpanded && isCurrentNode) || hasNestedNodes;

  const nodeBackgroundColors = [theme.palette.tree.level1, theme.palette.tree.level2, theme.palette.tree.level3];
  const backgroundColor = (nodeExpanded && isCurrentNode) || hasNestedNodes
    ? nodeBackgroundColors[nestedLevel % 3] : theme.palette.tree.default;

  const parentBackgroundColor = parentExpanded
    ? nodeBackgroundColors[(nestedLevel - 1) % 3] : theme.palette.tree.default;

  const color = hasBg
    ? theme.palette.tree.selectedText : theme.palette.tree.defaultText;

  return {
    backgroundColor,
    parentBackgroundColor,
    color,
    hasBg,
  };
}
