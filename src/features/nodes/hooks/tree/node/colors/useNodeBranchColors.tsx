import useDiffColors, { DiffState } from '../../../../../../common/hooks/useDiffColors';
import { NodecosmosTheme } from '../../../../../../themes/themes.types';
import { withOpacity } from '../../../../../../utils/colors';
import useNodeBranchContext from '../useNodeBranchContext';
import useNodeContext from '../useNodeContext';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';

export default function useNodeBranchColors() {
    const { isSelected, nestedLevel } = useNodeContext();
    const {
        isCreated, isDeleted, isEdited, isOriginalDeleted, isReordered, isDescriptionEdited,
    } = useNodeBranchContext();
    const theme: NodecosmosTheme = useTheme();
    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedTreeColor = backgrounds[nestedLevel % backgroundCount];
    const { defaultBorder } = theme.palette.tree;
    const diffColors = useDiffColors();

    return useMemo(() => {
        const backgroundColor = isSelected ? withOpacity(nestedTreeColor.fg, 0.8) : theme.palette.tree.default;
        const outlineColor = defaultBorder;
        const color = (isSelected && theme.palette.tree.selectedText) || theme.palette.tree.defaultText;
        const parentBackgroundColor = theme.palette.workflow.defaultInputColor;

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
            parentBackgroundColor,
            isSelected,
            outlinedColored,
            nestedTreeColor,
        };
    },
    [
        isCreated, isDeleted, isOriginalDeleted, isSelected, isReordered, isDescriptionEdited, isEdited,
        defaultBorder, nestedTreeColor, theme.palette, diffColors,
    ],
    );
}
