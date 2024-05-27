import useFlowStepNodeContext from './flow-step-node/useFlowStepNodeContext';
import useDiffColors, { DiffState } from '../../../../common/hooks/useDiffColors';
import { NodecosmosTheme } from '../../../../themes/themes.types';
import { withOpacity } from '../../../../utils/colors';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { maybeSelectNode } from '../../../nodes/nodes.selectors';
import useWorkflowBranch from '../useWorkflowBranch';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function useFlowStepNodeColors() {
    const {
        branchId, id, isSelected, flowStepId,
    } = useFlowStepNodeContext();
    const { isBranch } = useBranchContext();
    const diffColors = useDiffColors();
    const {
        isFlowStepNodeCreated, isFlowStepNodeDeleted, isFlowStepDeleted, isFlowStepCreated,
    } = useWorkflowBranch();
    const fsNode = useSelector(maybeSelectNode(branchId, id));
    const theme: NodecosmosTheme = useTheme();
    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedTreeColor = backgrounds[(fsNode?.ancestorIds?.length || 0) % backgroundCount];

    let colors = {
        backgroundColor: isSelected ? withOpacity(nestedTreeColor.fg, 0.8) : nestedTreeColor.bg,
        outlineColor: isSelected ? 'transparent' : withOpacity(nestedTreeColor.fg, 0.4),
        color: isSelected ? theme.palette.tree.selectedText : nestedTreeColor.fg,
    };

    if (isBranch) {
        if (isFlowStepDeleted(flowStepId) || isFlowStepNodeDeleted(flowStepId, id)) {
            colors = diffColors(isSelected, DiffState.Removed);
        } else if (isFlowStepNodeCreated(flowStepId, id) || isFlowStepCreated(flowStepId)) {
            colors = diffColors(isSelected, DiffState.Added);
        }
        else {
            colors = {
                backgroundColor: isSelected ? withOpacity(nestedTreeColor.fg, 0.8) : theme.palette.tree.default,
                outlineColor: theme.palette.tree.defaultBorder,
                color: isSelected ? theme.palette.tree.selectedText : theme.palette.tree.defaultText,
            };
        }
    }

    return {
        nestedTreeColor,
        ...colors,
    };
}
