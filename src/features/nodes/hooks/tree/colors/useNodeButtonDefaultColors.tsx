import { NodecosmosTheme } from '../../../../../themes/type';
import useNodeContext from '../useNodeContext';
import { useTheme } from '@mui/material';

export default function useNodeButtonDefaultColors() {
    const {
        isSelected, nestedLevel, isRoot, lastChildId,
    } = useNodeContext();

    const theme: NodecosmosTheme = useTheme();
    const hasChildren = !!lastChildId;

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
