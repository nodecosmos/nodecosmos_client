import useNodeBranchColors from './colors/useNodeBranchColors';
import useNodeCheckboxColors from './colors/useNodeCheckboxColors';
import useNodeDefaultColors from './colors/useNodeDefaultColors';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { TreeType } from '../../nodes.types';
import useTreeContext from '../tree/useTreeContext';
import { useMemo } from 'react';

export default function useNodeColors() {
    const defaultColors = useNodeDefaultColors();
    const checkboxColors = useNodeCheckboxColors();
    const branchColors = useNodeBranchColors();

    const { isBranch } = useBranchContext();
    const { type: treeType } = useTreeContext();

    return useMemo(() => {
        if (treeType === TreeType.Checkbox) {
            return checkboxColors;
        } else if (treeType === TreeType.ContributionRequest || isBranch) {
            return branchColors;
        }

        return defaultColors;
    }, [branchColors, checkboxColors, defaultColors, isBranch, treeType]);
}
