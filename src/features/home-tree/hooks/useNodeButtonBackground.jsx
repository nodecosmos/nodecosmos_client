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

    const hasBg = isCurrentNode;
    const outlinedColored = !isCurrentNode && hasNestedNodes;

    const backgroundColor = isCurrentNode
        ? backgrounds[nestedLevel % backgroundCount] : theme.palette.tree.default;

    const outlineColor = !isCurrentNode && hasNestedNodes
        ? backgrounds[nestedLevel % backgroundCount] : 'transparent';

    const parentBackgroundColor = parentExpanded
        ? backgrounds[(nestedLevel - 1) % backgroundCount] : theme.palette.tree.default;

    const color = (outlinedColored && outlineColor)
    || (hasBg && theme.palette.tree.selectedText) || theme.palette.tree.defaultText;
    const hashColor = (outlinedColored && outlineColor)
    || (hasBg && theme.palette.tree.selectedText) || theme.palette.tree.hashtag;

    return {
        backgroundColor: outlinedColored ? theme.palette.background[3] : backgroundColor,
        outlineColor,
        parentBackgroundColor,
        color,
        hashColor,
    };
}
