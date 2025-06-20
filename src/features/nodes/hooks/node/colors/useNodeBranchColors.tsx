import useDiffColors, { DiffState } from '../../../../../common/hooks/useDiffColors';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useNodeBranchContext from '../useNodeBranchContext';
import useNodeContext from '../useNodeContext';
import { useTheme } from '@mui/material';
import { useCallback } from 'react';

export default function useNodeBranchColors() {
    const { isSelected, nestedLevel } = useNodeContext();
    const branchCtx = useNodeBranchContext();
    const theme: NodecosmosTheme = useTheme();
    const diffColors = useDiffColors();

    return useCallback(() => {
        const { backgrounds } = theme.palette.tree;
        const backgroundCount = backgrounds.length;
        const { defaultBorder } = theme.palette.tree;
        const nestedTreeColor = backgrounds[nestedLevel % backgroundCount].fg;

        if (!branchCtx) return {
            backgroundColor: theme.palette.tree.default,
            outlineColor: defaultBorder,
            color: theme.palette.tree.defaultText,
            parentColor: theme.palette.workflow.defaultInputColor,
            parentBg: theme.palette.workflow.defaultInputColor,
            isSelected: false,
            outlinedColored: false,
            nestedTreeColor,
        };

        const {
            isCreated,
            isDeleted,
            isEdited,
            isOriginalDeleted,
            isReordered,
            isDescriptionEdited,
        } = branchCtx;
        const backgroundColor = isSelected ? nestedTreeColor : theme.palette.tree.default;
        const outlineColor = defaultBorder;
        const color = (isSelected && theme.palette.tree.selectedText) || theme.palette.tree.defaultText;
        const parentColor = theme.palette.workflow.defaultInputColor;
        const parentBg = theme.palette.workflow.defaultInputColor;

        let outlinedColored = true;
        let branchColors;

        if (isDeleted) {
            branchColors = diffColors(isSelected, DiffState.Removed);
        } else if (isCreated) {
            branchColors = diffColors(isSelected, DiffState.Added);
        }
        else if (isOriginalDeleted) {
            branchColors = diffColors(isSelected, DiffState.Conflict);
        } else if (isReordered || isDescriptionEdited || isEdited) {
            branchColors = diffColors(isSelected, DiffState.Edited);
        } else {
            branchColors = {
                backgroundColor,
                outlineColor,
                color,
            };
            outlinedColored = isSelected;
        }

        return {
            ...branchColors,
            parentColor,
            parentBg,
            isSelected,
            outlinedColored,
            nestedTreeColor,
        };
    }, [theme, nestedLevel, branchCtx, isSelected, diffColors]);
}
