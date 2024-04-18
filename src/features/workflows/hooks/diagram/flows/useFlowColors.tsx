import useFlowContext from './useFlowContext';
import useDiffColors, { DiffState } from '../../../../../common/hooks/useDiffColors';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import useWorkflowBranch from '../../useWorkflowBranch';

export default function useFlowColors() {
    const { isBranch } = useBranchParams();
    const { isFlowDeletedConflict } = useWorkflowBranch();
    const diffColors = useDiffColors();

    const { id } = useFlowContext();

    let colors = {
        backgroundColor: 'transparent',
        outlineColor: 'transparent',
        color: 'transparent',
    };

    if (isBranch) {
        if (isFlowDeletedConflict(id)) {
            colors = diffColors(true, DiffState.Conflict, 0.1);
        }
    }

    return colors;
}
