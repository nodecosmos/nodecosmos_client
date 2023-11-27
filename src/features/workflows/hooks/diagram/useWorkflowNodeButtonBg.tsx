import { NodecosmosTheme } from '../../../../themes/type';
import { UUID } from '../../../../types';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import { selectSelectedWorkflowObject } from '../../workflow.selectors';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function useWorkflowNodeButtonBg({ id }: {id: UUID}) {
    const selectedWorkflowObject = useSelector(selectSelectedWorkflowObject);
    const nestedLevel = useSelector(selectNodeAttribute(id, 'nestedLevel'));

    const theme: NodecosmosTheme = useTheme();

    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const color = backgrounds[nestedLevel % backgroundCount];

    const isSelected = selectedWorkflowObject?.id === id;

    const backgroundColor = isSelected ? color : theme.palette.background[3];
    const outlineColor = isSelected ? 'transparent' : color;

    return {
        backgroundColor,
        outlineColor,
        color: isSelected ? theme.palette.tree.selectedText : color,
    };
}
