import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTreeNode } from '../../trees.selectors';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';

export default function useNodeButtonContributionRequestColors(treeId) {
    const { nodeId } = useSelector(selectTreeNode(treeId));
    const nestedLevel = useSelector(selectNodeAttribute(nodeId, 'nestedLevel'));
    const isSelected = useSelector(selectNodeAttribute(nodeId, 'isSelected'));
    const theme = useTheme();
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
