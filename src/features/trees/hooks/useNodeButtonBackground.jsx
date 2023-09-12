import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { selectHasChildren, selectTreeNode } from '../trees.selectors';
import { selectTheme } from '../../app/app.selectors';

function hexWithOpacity(hex) {
  // return hex with 30% opacity
  return `${hex}26`;
}

export default function useNodeButtonBackground(treeId) {
  const {
    nodeId,
    isRoot,
  } = useSelector(selectTreeNode(treeId));
  const isSelected = useSelector(selectNodeAttribute(nodeId, 'isSelected'));
  const nestedLevel = useSelector(selectNodeAttribute(nodeId, 'nestedLevel'));
  const theme = useTheme();
  const selectedTheme = useSelector(selectTheme);

  const hasChildren = useSelector(selectHasChildren(treeId));
  const { backgrounds } = theme.palette.tree;
  const backgroundCount = backgrounds.length;
  const hasBg = isSelected;
  const outlinedColored = !hasBg && hasChildren;

  const nestedTreeColor = backgrounds[nestedLevel % backgroundCount];

  let backgroundColor = hasBg ? nestedTreeColor : theme.palette.tree.default;

  const color = (hasBg && theme.palette.tree.selectedText)
    || (outlinedColored && nestedTreeColor) || theme.palette.tree.defaultText;

  const parentBackgroundColor = isRoot
    ? theme.palette.tree.default : backgrounds[(nestedLevel - 1) % backgroundCount];
  const outlineColor = outlinedColored ? nestedTreeColor : theme.palette.tree.defaultBorder;

  if (outlinedColored) {
    // eslint-disable-next-line prefer-destructuring
    backgroundColor = theme.palette.background[3];

    // if (selectedTheme === 'light') {
    //   backgroundColor = hexWithOpacity(nestedTreeColor);
    // }
  }
  return {
    backgroundColor,
    outlineColor,
    parentBackgroundColor,
    color,
    hasBg,
    outlinedColored,
  };
}
