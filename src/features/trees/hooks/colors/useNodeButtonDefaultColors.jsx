import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import { selectHasChildren, selectTreeNode } from '../../trees.selectors';

export default function useNodeButtonDefaultColors(treeId) {
    const { nodeId, isRoot } = useSelector(selectTreeNode(treeId));
    const isSelected = useSelector(selectNodeAttribute(nodeId, 'isSelected'));
    const nestedLevel = useSelector(selectNodeAttribute(nodeId, 'nestedLevel'));
    const hasChildren = useSelector(selectHasChildren(treeId));
    const theme = useTheme();

    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedTreeColor = backgrounds[nestedLevel % backgroundCount];
    const { defaultBorder } = theme.palette.tree;

    const hasBg = isSelected;
    const outlinedColored = hasChildren;

    let backgroundColor = hasBg ? nestedTreeColor : theme.palette.tree.default;

    const color = (hasBg && theme.palette.tree.selectedText)
    || (outlinedColored && nestedTreeColor) || theme.palette.tree.defaultText;

    const parentBackgroundColor = isRoot
        ? theme.palette.tree.default : backgrounds[(nestedLevel - 1) % backgroundCount];

    const outlineColor = outlinedColored ? nestedTreeColor : defaultBorder;

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
