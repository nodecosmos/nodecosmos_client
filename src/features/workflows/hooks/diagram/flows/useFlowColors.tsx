import useFlowContext from './useFlowContext';
import useDiffColors, { DiffState } from '../../../../../common/hooks/useDiffColors';
import { NodecosmosTheme } from '../../../../../themes/type';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import useWorkflowBranch from '../../useWorkflowBranch';
import { useTheme } from '@mui/material';

export default function useFlowColors() {
    const theme: NodecosmosTheme = useTheme();
    const { isBranch } = useBranchParams();
    const {
        isFlowCreated, isFlowDeleted, isFlowDeletedConflict,
    } = useWorkflowBranch();
    const diffColors = useDiffColors();

    const { id, isSelected } = useFlowContext();

    let colors = {
        backgroundColor: isSelected ? theme.palette.workflow.selectedBg : 'transparent',
        outlineColor: theme.palette.borders[1],
        color: theme.palette.tree.defaultText,
    };

    if (isBranch) {
        if (isFlowDeletedConflict(id)) {
            colors = diffColors(true, DiffState.Conflict, 0.1);
        } else if (isFlowCreated(id)) {
            colors = diffColors(true, DiffState.Added, 0.5);
        } else if (isFlowDeleted(id)) {
            colors = diffColors(true, DiffState.Removed, 0.5);
        }
    }

    return colors;
}
