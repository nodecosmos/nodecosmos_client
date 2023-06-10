import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { selectHasChildren, selectTreeNode } from '../trees.selectors';

export default function useNodeButtonBackground(treeId) {
  const {
    nodeId,
    isExpanded,
    nestedLevel,
    isRoot,
  } = useSelector(selectTreeNode(treeId));
  const isSelected = useSelector(selectNodeAttribute(nodeId, 'isSelected'));
  const theme = useTheme();

  const hasChildren = useSelector(selectHasChildren(treeId));
  const { backgrounds } = theme.palette.tree;
  const backgroundCount = backgrounds.length;

  const hasBg = isSelected || (isExpanded && hasChildren);

  const outlinedColored = !hasBg && hasChildren;
  const backgroundColor = hasBg ? backgrounds[nestedLevel % backgroundCount] : theme.palette.tree.default;
  const color = (hasBg && theme.palette.tree.selectedText)
    || (outlinedColored && backgrounds[nestedLevel % backgroundCount]) || theme.palette.tree.defaultText;

  const parentBackgroundColor = isRoot
    ? theme.palette.tree.default : backgrounds[(nestedLevel - 1) % backgroundCount];
  const outlineColor = outlinedColored ? backgrounds[nestedLevel % backgroundCount] : theme.palette.tree.default;

  return {
    backgroundColor: outlinedColored ? theme.palette.tree.default : backgroundColor,
    outlineColor,
    parentBackgroundColor,
    color,
    hasBg,
    outlinedColored,
  };
}
