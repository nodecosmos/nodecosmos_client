import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { selectHasChildren, selectTreeNode } from '../trees.selectors';

export default function useNodeButtonBackground(treeId) {
  const theme = useTheme();
  const {
    nodeId,
    isExpanded,
    nestedLevel,
    isRoot,
  } = useSelector(selectTreeNode(treeId));
  const isSelected = useSelector(selectNodeAttribute(nodeId, 'isSelected'));

  const hasChildren = useSelector(selectHasChildren(treeId));
  const nodeBackgroundColors = [
    theme.palette.tree.level1, theme.palette.tree.level2, theme.palette.tree.level3, theme.palette.tree.level4,
  ];

  const hasBg = (isExpanded && isSelected) || hasChildren;

  const backgroundColor = hasBg ? nodeBackgroundColors[nestedLevel % 4] : theme.palette.tree.default;
  const color = hasBg ? theme.palette.tree.selectedText : theme.palette.tree.defaultText;

  const parentBackgroundColor = isRoot ? theme.palette.tree.default : nodeBackgroundColors[(nestedLevel - 1) % 4];
  return {
    backgroundColor,
    parentBackgroundColor,
    color,
    hasBg,
  };
}
