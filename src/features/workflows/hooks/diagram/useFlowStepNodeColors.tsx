import useFlowStepNodeContext from './flow-step-node/useFlowStepNodeContext';
import useDiffColors, { DiffState } from '../../../../common/hooks/useDiffColors';
import { NodecosmosTheme } from '../../../../themes/type';
import useBranchParams from '../../../branch/hooks/useBranchParams';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import useWorkflowBranch from '../useWorkflowBranch';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function useFlowStepNodeColors() {
    const {
        branchId, id, isSelected, flowStepId,
    } = useFlowStepNodeContext();
    const { isBranch } = useBranchParams();
    const diffColors = useDiffColors();
    const {
        isFlowStepNodeCreated, isFlowStepNodeDeleted, isFlowStepDeleted, isFlowStepCreated,
    } = useWorkflowBranch();
    const ancestorIds = useSelector(selectNodeAttribute(branchId, id, 'ancestorIds'));
    const theme: NodecosmosTheme = useTheme();
    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedTreeColor = backgrounds[(ancestorIds?.length || 0) % backgroundCount];

    let colors = {
        backgroundColor: isSelected ? nestedTreeColor : theme.palette.background[3],
        outlineColor: isSelected ? 'transparent' : nestedTreeColor,
        color: isSelected ? theme.palette.tree.selectedText : nestedTreeColor,
    };

    if (isBranch) {
        if (isFlowStepDeleted(flowStepId) || isFlowStepNodeDeleted(flowStepId, id)) {
            colors = diffColors(isSelected, DiffState.Removed);
        } else if (isFlowStepNodeCreated(flowStepId, id) || isFlowStepCreated(flowStepId)) {
            colors = diffColors(isSelected, DiffState.Added);
        }
        else {
            colors = {
                backgroundColor: isSelected ? nestedTreeColor : theme.palette.tree.default,
                outlineColor: theme.palette.tree.defaultBorder,
                color: isSelected ? theme.palette.tree.selectedText : theme.palette.tree.defaultText,
            };
        }
    }

    return colors;
}
