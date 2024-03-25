import useFlowStepContext from './useFlowStepContext';
import useDiffColors, { DiffState } from '../../../../../common/hooks/useDiffColors';
import { NodecosmosTheme } from '../../../../../themes/type';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import useWorkflowBranchContext from '../../useWorkflowBranchContext';
import { useTheme } from '@mui/material';

export default function useFlowStepColors() {
    const theme: NodecosmosTheme = useTheme();
    const { isBranch } = useBranchParams();
    const { isFlowStepCreated, isFlowStepDeleted } = useWorkflowBranchContext();
    const diffColors = useDiffColors();

    const { id } = useFlowStepContext();

    let colors = {
        backgroundColor: 'transparent',
        outlineColor: theme.palette.borders[1],
        color: theme.palette.tree.defaultText,
    };

    if (isBranch) {
        if (isFlowStepCreated(id)) {
            colors = diffColors(true, DiffState.Added, 0.3);
        } else if (isFlowStepDeleted(id)) {
            colors = diffColors(true, DiffState.Removed, 0.3);
        }
    }

    return colors;
}
