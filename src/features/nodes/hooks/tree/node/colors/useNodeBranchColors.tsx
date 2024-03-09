import { NodecosmosTheme } from '../../../../../../themes/type';
import { withOpacity } from '../../../../../../utils/colors';
import useBranchContext from '../useBranchContext';
import useNodeContext from '../useNodeContext';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';

export default function useNodeBranchColors() {
    const { isSelected, nestedLevel } = useNodeContext();
    const {
        isCreated, isDeleted, isOriginalDeleted, isReordered, isDescriptionEdited,
    } = useBranchContext();
    const theme: NodecosmosTheme = useTheme();
    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedTreeColor = backgrounds[nestedLevel % backgroundCount];
    const { defaultBorder } = theme.palette.tree;

    return useMemo(() => {
        let backgroundColor = isSelected ? nestedTreeColor : theme.palette.tree.default;
        let color = (isSelected && theme.palette.tree.selectedText) || theme.palette.tree.defaultText;
        const parentBackgroundColor = theme.palette.workflow.defaultInputColor;

        let outlineColor = defaultBorder;
        let outlinedColored = isSelected;

        if (isCreated) {
            outlineColor = theme.palette.tree.backgrounds[3];
            color = theme.palette.tree.backgrounds[3];
            backgroundColor = isSelected
                ? withOpacity(theme.palette.tree.backgrounds[3], 0.3)
                : withOpacity(theme.palette.tree.backgrounds[3], 0.1);
            outlinedColored = true;
        } else if (isDeleted) {
            outlineColor = theme.palette.tree.backgrounds[0];
            color = theme.palette.tree.backgrounds[0];
            backgroundColor = isSelected
                ? withOpacity(theme.palette.tree.backgrounds[0], 0.3)
                : withOpacity(theme.palette.tree.backgrounds[0], 0.1);
            outlinedColored = true;
        } else if (isOriginalDeleted) {
            outlineColor = theme.palette.tree.backgrounds[5];
            color = theme.palette.tree.backgrounds[5];
            backgroundColor = isSelected
                ? withOpacity(theme.palette.tree.backgrounds[5], 0.3)
                : withOpacity(theme.palette.tree.backgrounds[5], 0.1);
            outlinedColored = true;
        } else if (isReordered || isDescriptionEdited) {
            outlineColor = theme.palette.tree.backgrounds[4];
            color = theme.palette.tree.backgrounds[4];
            backgroundColor = isSelected
                ? withOpacity(theme.palette.tree.backgrounds[4], 0.3)
                : withOpacity(theme.palette.tree.backgrounds[4], 0.1);
            outlinedColored = true;
        }

        return {
            backgroundColor,
            outlineColor,
            parentBackgroundColor,
            color,
            isSelected,
            outlinedColored,
            nestedTreeColor,
        };
    },
    [
        isCreated, isDeleted, isOriginalDeleted, isSelected, isReordered, isDescriptionEdited,
        defaultBorder, nestedTreeColor, theme.palette,
    ],
    );
}
