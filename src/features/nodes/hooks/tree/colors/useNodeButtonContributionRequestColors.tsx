import { NodecosmosTheme } from '../../../../../themes/type';
import { appendOpacityToHex } from '../../../../../utils/colors';
import { selectBranch } from '../../../../branch/branches.selectors';
import useNodeContext from '../useNodeContext';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function useNodeButtonContributionRequestColors() {
    const {
        treeBranchId, isSelected, nestedLevel, id,
    } = useNodeContext();
    const branch = useSelector(selectBranch(treeBranchId));
    const theme: NodecosmosTheme = useTheme();
    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedTreeColor = backgrounds[nestedLevel % backgroundCount];
    const { defaultBorder } = theme.palette.tree;

    let backgroundColor = isSelected ? nestedTreeColor : theme.palette.tree.default;
    let color = (isSelected && theme.palette.tree.selectedText) || theme.palette.tree.defaultText;
    const parentBackgroundColor = theme.palette.workflow.defaultInputColor;

    let outlineColor = defaultBorder;
    let outlinedColored = isSelected;

    if (branch?.createdNodes?.has(id)) {
        outlineColor = theme.palette.tree.backgrounds[3];
        color = theme.palette.tree.backgrounds[3];
        backgroundColor = isSelected
            ? appendOpacityToHex(theme.palette.tree.backgrounds[3], 0.3)
            : appendOpacityToHex(theme.palette.tree.backgrounds[3], 0.1);
        outlinedColored = true;
    } else if (branch?.deletedNodes?.has(id)) {
        outlineColor = theme.palette.tree.backgrounds[0];
        color = theme.palette.tree.backgrounds[0];
        backgroundColor = isSelected
            ? appendOpacityToHex(theme.palette.tree.backgrounds[0], 0.3)
            : appendOpacityToHex(theme.palette.tree.backgrounds[0], 0.1);
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
}
