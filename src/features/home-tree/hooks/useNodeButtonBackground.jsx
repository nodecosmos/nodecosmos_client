import { withOpacity } from '../../../utils/colors';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function useNodeButtonBackground(props) {
    const {
        id, isRoot, nestedLevel,
    } = props;

    const theme = useTheme();

    const parentID = useSelector((state) => state.landingPageNodes[id].parent_id);
    const nodeExpanded = useSelector((state) => state.landingPageNodes[id].expanded);
    const parentExpanded = useSelector((state) => !isRoot && state.landingPageNodes[parentID].expanded);

    const currentNodeId = useSelector((state) => state.app.currentNodeId);
    const isCurrentNode = nodeExpanded && id === currentNodeId;
    const hasNestedNodes = useSelector((state) => state.landingPageNodes[id].node_ids.length > 0);

    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedLevelColor = backgrounds[nestedLevel % backgroundCount];

    const hasBg = isCurrentNode;
    const outlinedColored = !isCurrentNode && hasNestedNodes;

    const backgroundColor = isCurrentNode
        ? withOpacity(nestedLevelColor.fg, 0.8) : theme.palette.tree.default;

    const outlineColor = !isCurrentNode && hasNestedNodes
        ? nestedLevelColor.fg : 'transparent';

    const parentBackgroundColor = parentExpanded
        ? backgrounds[(nestedLevel - 1) % backgroundCount].fg : theme.palette.tree.default;

    const color = (outlinedColored && outlineColor)
    || (hasBg && theme.palette.tree.selectedText) || theme.palette.tree.defaultText;
    const hashColor = (outlinedColored && outlineColor)
    || (hasBg && theme.palette.tree.selectedText) || theme.palette.tree.hashtag;

    return {
        backgroundColor: outlinedColored ? nestedLevelColor.bg : backgroundColor,
        outlineColor,
        parentBackgroundColor,
        color,
        hashColor,
    };
}
