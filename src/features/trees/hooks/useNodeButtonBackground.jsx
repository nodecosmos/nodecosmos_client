import { useMemo } from 'react';
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
  const nodeBackgroundColors = useMemo(
    () => [theme.palette.tree.level1, theme.palette.tree.level2, theme.palette.tree.level3],
    [theme.palette.tree.level1, theme.palette.tree.level2, theme.palette.tree.level3],
  );

  const backgroundColor = useMemo(
    () => (
      (isExpanded && isSelected) || hasChildren ? nodeBackgroundColors[nestedLevel % 3] : theme.palette.tree.default),
    [hasChildren, isExpanded, isSelected, nestedLevel, nodeBackgroundColors, theme.palette.tree.default],
  );

  const parentBackgroundColor = useMemo(
    () => (isRoot ? theme.palette.tree.default : nodeBackgroundColors[(nestedLevel - 1) % 3]),
    [isRoot, nestedLevel, nodeBackgroundColors, theme.palette.tree.default],
  );

  const color = useMemo(
    () => ((isExpanded && isSelected) || hasChildren
      ? theme.palette.tree.selectedText : theme.palette.tree.defaultText),
    [hasChildren, isExpanded, isSelected, theme.palette.tree.defaultText, theme.palette.tree.selectedText],
  );

  return {
    backgroundColor,
    parentBackgroundColor,
    color,
  };
}
