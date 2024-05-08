import useFlowStepContext from './useFlowStepContext';
import useDiffColors, { DiffState } from '../../../../../common/hooks/useDiffColors';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import useWorkflowBranch from '../../useWorkflowBranch';
import { useTheme } from '@mui/material';

export default function useFlowStepColors() {
    const theme: NodecosmosTheme = useTheme();
    const { isBranch } = useBranchContext();
    const {
        isFlowStepCreated, isFlowStepDeleted, isFlowStepInConflict, isFlowStepDeletedConflict, isFlowDeleted,
    } = useWorkflowBranch();

    const diffColors = useDiffColors();

    const {
        id, flowId, isSelected,
    } = useFlowStepContext();

    let colors = {
        backgroundColor: isSelected ? theme.palette.workflow.selectedBg : 'transparent',
        outlineColor: theme.palette.borders[1],
        color: theme.palette.tree.defaultText,
    };

    if (isBranch) {
        if (isFlowStepInConflict(id) || isFlowStepDeletedConflict(id)) {
            colors = diffColors(true, DiffState.Conflict, 0.2);
        } else if (isFlowDeleted(flowId) || isFlowStepDeleted(id)) {
            colors = diffColors(true, DiffState.Removed, 0.5);
        } else if (isFlowStepCreated(id)) {
            colors = diffColors(true, DiffState.Added, 0.3);
        }
    }

    return colors;
}
