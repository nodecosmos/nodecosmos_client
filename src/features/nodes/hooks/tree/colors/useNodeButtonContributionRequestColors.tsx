import { NodecosmosTheme } from '../../../../../themes/type';
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

    const hasBg = isSelected;
    const backgroundColor = hasBg ? nestedTreeColor : theme.palette.tree.default;
    const color = (hasBg && theme.palette.tree.selectedText) || theme.palette.tree.defaultText;
    const parentBackgroundColor = theme.palette.workflow.defaultInputColor;

    let outlineColor = defaultBorder;

    if (branch?.createdNodesById?.[id]) {
        outlineColor = theme.palette.tree.backgrounds[3];
    }

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
