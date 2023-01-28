import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

// FIXME: currently it's  dumb implementation
export default function useNodeButtonBackground(props) {
  const {
    id, isRoot, nestedLevel,
  } = props;

  const theme = useTheme();

  const isCurrent = useSelector((state) => state.nodes.byId[id].isCurrent);
  const isExpanded = useSelector((state) => state.nodes.expandedTreeNodesById[id]);

  const parentId = useSelector((state) => state.nodes.byId[id].parent_id);
  const parentExpanded = useSelector((state) => !isRoot && state.nodes.expandedTreeNodesById[parentId]);

  const hasNestedNodes = useSelector((state) => state.nodes.nestedNodesByParentId[id].length > 0);

  const nodeBackgroundColors = [theme.palette.tree.level1, theme.palette.tree.level2, theme.palette.tree.level3];
  const backgroundColor = (isExpanded && isCurrent) || hasNestedNodes
    ? nodeBackgroundColors[nestedLevel % 3] : theme.palette.tree.default;

  const parentBackgroundColor = parentExpanded
    ? nodeBackgroundColors[(nestedLevel - 1) % 3] : theme.palette.tree.default;

  const color = (isExpanded && isCurrent) || hasNestedNodes
    ? theme.palette.tree.selectedText : theme.palette.tree.defaultText;

  return {
    backgroundColor,
    parentBackgroundColor,
    color,
  };
}
