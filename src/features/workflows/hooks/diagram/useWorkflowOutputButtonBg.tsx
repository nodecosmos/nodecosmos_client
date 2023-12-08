import { NodecosmosTheme } from '../../../../themes/type';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import { selectSelectedWorkflowObject } from '../../workflow.selectors';
import useWorkflowContext from '../useWorkflowContext';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

interface Props {
    id: string;
    nodeId: string;
}

export default function useWorkflowOutputButtonBg({ id, nodeId }: Props) {
    const { branchId } = useWorkflowContext();

    const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowObject);
    const ancestorIds = useSelector(selectNodeAttribute(branchId, nodeId, 'ancestorIds'));
    const nestedLevel = ancestorIds?.length || 0;

    const theme: NodecosmosTheme = useTheme();

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
