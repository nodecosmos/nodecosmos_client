import useFlowStepNodeContext from './flow-step-node/useFlowStepNodeContext';
import { NodecosmosTheme } from '../../../../themes/type';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function useWorkflowNodeButtonBg() {
    const {
        branchId, id, isSelected,
    } = useFlowStepNodeContext();
    const ancestorIds = useSelector(selectNodeAttribute(branchId, id, 'ancestorIds'));

    const theme: NodecosmosTheme = useTheme();

    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const color = backgrounds[(ancestorIds?.length || 0) % backgroundCount];

    const backgroundColor = isSelected ? color : theme.palette.background[3];
    const outlineColor = isSelected ? 'transparent' : color;

    return {
        backgroundColor,
        outlineColor,
        color: isSelected ? theme.palette.tree.selectedText : color,
    };
}
