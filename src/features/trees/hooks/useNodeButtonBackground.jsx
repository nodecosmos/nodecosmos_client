import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { selectHasChildren, selectTreeNode } from '../trees.selectors';
import { TREES_TYPES } from '../trees.constants';
import { useTreeCheckbox } from './useTreeContext';

export default function useNodeButtonBackground(treeId) {
  const { nodeId, isRoot } = useSelector(selectTreeNode(treeId));
  const persistentId = useSelector(selectNodeAttribute(nodeId, 'persistentId'));
  const isSelected = useSelector(selectNodeAttribute(nodeId, 'isSelected'));
  const nestedLevel = useSelector(selectNodeAttribute(nodeId, 'nestedLevel'));
  const hasChildren = useSelector(selectHasChildren(treeId));
  const { treeType, commands } = useTreeCheckbox();
  const theme = useTheme();

  const { backgrounds } = theme.palette.tree;
  const backgroundCount = backgrounds.length;
  const nestedTreeColor = backgrounds[nestedLevel % backgroundCount];
  const { defaultBorder, checkboxColor } = theme.palette.tree;

  const isChecked = treeType === TREES_TYPES.checkbox && commands.isChecked(persistentId);
  const hasBg = isSelected && treeType !== TREES_TYPES.checkbox;
  const outlinedColored = (hasChildren && treeType !== TREES_TYPES.checkbox) || isChecked;

  let backgroundColor = hasBg ? nestedTreeColor : theme.palette.tree.default;

  const color = (hasBg && theme.palette.tree.selectedText)
    || (outlinedColored && nestedTreeColor) || theme.palette.tree.defaultText;

  const parentBackgroundColor = isRoot
    ? theme.palette.tree.default : backgrounds[(nestedLevel - 1) % backgroundCount];

  const defaultOutlineColor = treeType === TREES_TYPES.checkbox ? checkboxColor : defaultBorder;
  const outlineColor = outlinedColored ? nestedTreeColor : defaultOutlineColor;

  if (outlinedColored && !hasBg) {
    // eslint-disable-next-line prefer-destructuring
    backgroundColor = theme.palette.background[3];
  }
  return {
    backgroundColor,
    outlineColor,
    parentBackgroundColor,
    color,
    hasBg,
    outlinedColored,
    nestedTreeColor,
  };
}
