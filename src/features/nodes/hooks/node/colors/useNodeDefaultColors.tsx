import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useNodeContext from '../useNodeContext';
import { useTheme } from '@mui/material';
import { useCallback } from 'react';

export default function useNodeDefaultColors() {
    const {
        isSelected, nestedLevel, isRoot, lastChildId,
    } = useNodeContext();
    const theme: NodecosmosTheme = useTheme();

    return useCallback(() => {
        const hasChildren = !!lastChildId;
        const { backgrounds } = theme.palette.tree;
        const backgroundCount = backgrounds.length;
        const nestedTreeColor = backgrounds[nestedLevel % backgroundCount];
        const { defaultBorder } = theme.palette.tree;
        const outlinedColored = hasChildren;

        let backgroundColor = isSelected ? nestedTreeColor.fg : theme.palette.tree.default;

        const color = (isSelected && theme.palette.tree.selectedText)
            || (hasChildren && nestedTreeColor.fg) || theme.palette.tree.defaultText;

        const parentColor = isRoot
            ? theme.palette.tree.default : backgrounds[(nestedLevel - 1) % backgroundCount].fg;
        const parentBg = isRoot ? theme.palette.tree.default : backgrounds[(nestedLevel - 1) % backgroundCount].bg;

        const outlineColor = hasChildren || isSelected ? nestedTreeColor.ol : defaultBorder;

        if (hasChildren && !isSelected) {
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
    }, [isRoot, isSelected, lastChildId, nestedLevel, theme]);
}
