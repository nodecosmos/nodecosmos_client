import { NodecosmosTheme } from '../../../../../themes/type';
import { selectNodeAttribute } from '../../../nodes.selectors';
import useNodeContext from '../useNodeContext';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function useNodeButtonContributionRequestColors() {
    const { treeBranchId, id } = useNodeContext();

    const isSelected = useSelector(selectNodeAttribute(treeBranchId, id, 'isSelected'));
    const nestedLevel = useSelector(selectNodeAttribute(treeBranchId, id, 'nestedLevel'));
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
