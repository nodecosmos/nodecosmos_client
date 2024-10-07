import { NodecosmosTheme } from '../../../../../themes/themes.types';
import { selectShowTreeColors } from '../../../nodes.selectors';
import useNodeContext from '../useNodeContext';
import { useTheme } from '@mui/material';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export default function useNodeDefaultColors() {
    const {
        isSelected, nestedLevel, isRoot, lastChildId,
    } = useNodeContext();
    const theme: NodecosmosTheme = useTheme();
    const showTreeColors = useSelector(selectShowTreeColors);

    return useCallback(() => {
        const hasChildren = !!lastChildId;
        const { backgrounds } = theme.palette.tree;
        const backgroundCount = backgrounds.length;
        const nestedTreeColor = backgrounds[nestedLevel % backgroundCount];
        const { defaultBorder } = theme.palette.tree;
        const outlinedColored = !isSelected && hasChildren;

        let backgroundColor = isSelected && showTreeColors ? nestedTreeColor.fg : theme.palette.tree.default;

        const color = (isSelected && showTreeColors && theme.palette.tree.selectedText)
            || (hasChildren && showTreeColors && nestedTreeColor.fg) || theme.palette.tree.defaultText;

        const parentColor = isRoot ? theme.palette.tree.default : backgrounds[(nestedLevel - 1) % backgroundCount].fg;
        const parentBg = isRoot ? theme.palette.tree.default : backgrounds[(nestedLevel - 1) % backgroundCount].bg;

        const outlineColor = showTreeColors && (hasChildren || isSelected) ? nestedTreeColor.ol : defaultBorder;

        if (hasChildren && !isSelected && showTreeColors) {
            backgroundColor = nestedTreeColor.bg;
        }

        return {
            backgroundColor,
            outlineColor,
            parentColor,
            parentBg,
            color,
            isSelected,
            outlinedColored,
            nestedTreeColor: nestedTreeColor.fg,
        };
    }, [isRoot, isSelected, lastChildId, nestedLevel, showTreeColors, theme.palette.tree]);
}
