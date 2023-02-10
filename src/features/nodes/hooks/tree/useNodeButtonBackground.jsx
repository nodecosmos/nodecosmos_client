import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  areNestedNodesPresent,
  selectIsNodeExpandedById,
  selectNodeAttributeById,
} from '../../nodes.selectors';

export default function useNodeButtonBackground(props) {
  const { id, nestedLevel, isRoot } = props;

  const theme = useTheme();

  const isCurrent = useSelector(selectNodeAttributeById(id, 'isCurrent'));
  const isExpanded = useSelector(selectIsNodeExpandedById(id));

  const hasNestedNodes = useSelector(areNestedNodesPresent(id));

  const nodeBackgroundColors = [theme.palette.tree.level1, theme.palette.tree.level2, theme.palette.tree.level3];
  const backgroundColor = (isExpanded && isCurrent) || hasNestedNodes
    ? nodeBackgroundColors[nestedLevel % 3] : theme.palette.tree.default;

  const parentBackgroundColor = isRoot ? theme.palette.tree.default : nodeBackgroundColors[(nestedLevel - 1) % 3];

  const color = (isExpanded && isCurrent) || hasNestedNodes
    ? theme.palette.tree.selectedText : theme.palette.tree.defaultText;

  return {
    backgroundColor,
    parentBackgroundColor,
    color,
  };
}
