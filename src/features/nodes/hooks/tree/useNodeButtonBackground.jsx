import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

// FIXME: currently it's  dumb implementation
export default function useNodeButtonBackground(props) {
  const {
    id, isRoot, nestedLevel,
  } = props;

  const theme = useTheme();

  const parentID = useSelector((state) => state.nodes[id].parent_id);
  const nodeExpanded = useSelector((state) => state.nodes[id].isExpanded);
  const parentExpanded = useSelector((state) => !isRoot && state.nodes[parentID].isExpanded);

  const currentNodeID = useSelector((state) => state.app.currentNodeID);
  const isCurrentNode = nodeExpanded && id === currentNodeID;
  const hasNestedNodes = useSelector((state) => state.nodes[id].node_ids.length > 0);

  const nodeBackgroundColors = [theme.palette.tree.level1, theme.palette.tree.level2, theme.palette.tree.level3];
  const backgroundColor = (nodeExpanded && isCurrentNode) || hasNestedNodes
    ? nodeBackgroundColors[nestedLevel % 3] : theme.palette.tree.default;

  const parentBackgroundColor = parentExpanded
    ? nodeBackgroundColors[(nestedLevel - 1) % 3] : theme.palette.tree.default;

  const color = (nodeExpanded && isCurrentNode) || hasNestedNodes
    ? theme.palette.tree.selectedText : theme.palette.tree.defaultText;

  return {
    backgroundColor,
    parentBackgroundColor,
    color,
  };
}
