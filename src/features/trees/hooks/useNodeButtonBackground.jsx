import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectHasChildren, selectTreeNode } from '../trees.selectors';

export default function useNodeButtonBackground(treeId) {
  const theme = useTheme();
  const {
    isSelected,
    isExpanded,
    nestedLevel,
    isRoot,
  } = useSelector(selectTreeNode(treeId));

  const hasChildren = useSelector(selectHasChildren(treeId));
  const nodeBackgroundColors = [theme.palette.tree.level1, theme.palette.tree.level2, theme.palette.tree.level3];
  const backgroundColor = (isExpanded && isSelected) || hasChildren
    ? nodeBackgroundColors[nestedLevel % 3] : theme.palette.tree.default;

  const parentBackgroundColor = isRoot ? theme.palette.tree.default : nodeBackgroundColors[(nestedLevel - 1) % 3];

  const color = (isExpanded && isSelected) || hasChildren
    ? theme.palette.tree.selectedText : theme.palette.tree.defaultText;

  return {
    backgroundColor,
    parentBackgroundColor,
    color,
  };
}
