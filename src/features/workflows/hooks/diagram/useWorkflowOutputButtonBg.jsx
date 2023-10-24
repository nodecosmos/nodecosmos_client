import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import { selectSelectedWorkflowObject } from '../../workflows.selectors';

export default function useWorkflowOutputButtonBg({ id, nodeId }) {
    const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowObject);
    const nestedLevel = useSelector(selectNodeAttribute(nodeId, 'nestedLevel')) || 1;

    const theme = useTheme();

    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedLevelColor = backgrounds[nestedLevel % backgroundCount];

    const isSelected = selectedWorkflowDiagramObject?.id === id;

    const backgroundColor = isSelected ? nestedLevelColor : theme.palette.background[4];

    return {
        backgroundColor,
        outlineColor: isSelected ? nestedLevelColor : theme.palette.workflow.defaultInputColor,
        color: isSelected ? theme.palette.tree.selectedText : theme.palette.tree.defaultText,
    };
}
