import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useTreeContext from '../../tree/useTreeContext';
import useNodeContext from '../useNodeContext';
import { useTheme } from '@mui/material';
import { useCallback } from 'react';

export default function useNodeCheckboxColors() {
    const {
        id, isRoot, nestedLevel,
    } = useNodeContext();
    const theme: NodecosmosTheme = useTheme();
    const commands = useTreeContext();

    return useCallback(() => {
        const { backgrounds } = theme.palette.tree;
        const backgroundCount = backgrounds.length;
        const nestedTreeColor = backgrounds[nestedLevel % backgroundCount].fg;
        const { checkboxColor } = theme.palette.tree;

        const isChecked = commands.isChecked(id);
        const outlinedColored = isChecked;
        const backgroundColor = isChecked ? theme.palette.background[3] : theme.palette.tree.default;

        const color = (isChecked && nestedTreeColor) || theme.palette.tree.defaultText;
        const parentColor = isRoot
            ? theme.palette.tree.default : backgrounds[(nestedLevel - 1) % backgroundCount].fg;
        const parentBg = isRoot ? theme.palette.tree.default : backgrounds[(nestedLevel - 1) % backgroundCount].bg;

        const outlineColor = isChecked ? nestedTreeColor : checkboxColor;

        return {
            backgroundColor,
            outlineColor,
            parentColor,
            parentBg,
            color,
            isSelected: false,
            outlinedColored,
            nestedTreeColor,
        };
    }, [commands, id, isRoot, nestedLevel, theme]);
}
