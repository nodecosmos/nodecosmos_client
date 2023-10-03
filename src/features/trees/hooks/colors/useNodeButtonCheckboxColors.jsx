import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTreeNode } from '../../trees.selectors';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import useTreeCommands from '../useTreeCommands';

export default function useNodeButtonCheckboxColors(treeId) {
  const { nodeId, isRoot } = useSelector(selectTreeNode(treeId));
  const nestedLevel = useSelector(selectNodeAttribute(nodeId, 'nestedLevel'));
  const commands = useTreeCommands();
  const theme = useTheme();

  const { backgrounds } = theme.palette.tree;
  const backgroundCount = backgrounds.length;
  const nestedTreeColor = backgrounds[nestedLevel % backgroundCount];
  const { checkboxColor } = theme.palette.tree;

  const isChecked = commands.isChecked(nodeId);
  const outlinedColored = isChecked;
  const backgroundColor = isChecked ? theme.palette.background[3] : theme.palette.tree.default;

  const color = (isChecked && nestedTreeColor) || theme.palette.tree.defaultText;
  const parentBackgroundColor = isRoot
    ? theme.palette.tree.default : backgrounds[(nestedLevel - 1) % backgroundCount];

  const outlineColor = isChecked ? nestedTreeColor : checkboxColor;

  return {
    backgroundColor,
    outlineColor,
    parentBackgroundColor,
    color,
    hasBg: false,
    outlinedColored,
    nestedTreeColor,
  };
}
