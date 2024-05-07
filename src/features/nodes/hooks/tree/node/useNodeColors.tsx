import useNodeBranchColors from './colors/useNodeBranchColors';
import useNodeCheckboxColors from './colors/useNodeCheckboxColors';
import useNodeDefaultColors from './colors/useNodeDefaultColors';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import { TreeType } from '../../../nodes.types';
import useTreeContext from '../useTreeContext';

export default function useNodeColors() {
    const defaultColors = useNodeDefaultColors();
    const checkboxColors = useNodeCheckboxColors();
    const branchColors = useNodeBranchColors();
    const { isBranch } = useBranchParams();
    const { type: treeType } = useTreeContext();

    if (treeType === TreeType.Checkbox) {
        return checkboxColors;
    } else if (treeType === TreeType.ContributionRequest || isBranch) {
        return branchColors;
    }

    return defaultColors;
}
