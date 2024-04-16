import useFlowStepContext from './useFlowStepContext';
import useDiffColors, { DiffState } from '../../../../../common/hooks/useDiffColors';
import { NodecosmosTheme } from '../../../../../themes/type';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import useWorkflowBranch from '../../useWorkflowBranch';
import { useTheme } from '@mui/material';

export default function useFlowStepColors() {
    const theme: NodecosmosTheme = useTheme();
    const { isBranch } = useBranchParams();
    const {
        isFlowStepCreated, isFlowStepDeleted, isFlowStepInConflict,
    } = useWorkflowBranch();
    const diffColors = useDiffColors();

    const { id, isSelected } = useFlowStepContext();

    let colors = {
        backgroundColor: isSelected ? theme.palette.workflow.selectedBg : 'transparent',
        outlineColor: theme.palette.borders[1],
        color: theme.palette.tree.defaultText,
    };

    if (isBranch) {
        if (isFlowStepInConflict(id)) {
            colors = diffColors(true, DiffState.Conflict, 0.2);
        } else if (isFlowStepCreated(id)) {
            colors = diffColors(true, DiffState.Added, 0.2);
        } else if (isFlowStepDeleted(id)) {
            colors = diffColors(true, DiffState.Removed, 0.2);
        }
    }

    return colors;
}
