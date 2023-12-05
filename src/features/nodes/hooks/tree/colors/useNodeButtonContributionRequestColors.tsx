import { NodecosmosTheme } from '../../../../../themes/type';
import useNodeContext from '../useNodeContext';
import { useTheme } from '@mui/material';

export default function useNodeButtonContributionRequestColors() {
    const { isSelected, nestedLevel } = useNodeContext();
    const theme: NodecosmosTheme = useTheme();
    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedTreeColor = backgrounds[nestedLevel % backgroundCount];
    const { defaultBorder } = theme.palette.tree;

    const hasBg = isSelected;
    const backgroundColor = hasBg ? nestedTreeColor : theme.palette.tree.default;
    const color = (hasBg && theme.palette.tree.selectedText) || theme.palette.tree.defaultText;
    const parentBackgroundColor = theme.palette.workflow.defaultInputColor;

    const outlineColor = defaultBorder;

    return {
        backgroundColor,
        outlineColor,
        parentBackgroundColor,
        color,
        hasBg,
        outlinedColored: false,
        nestedTreeColor,
    };
}
