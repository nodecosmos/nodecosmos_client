import useNodeButtonCheckboxColors from './colors/useNodeButtonCheckboxColors';
import useNodeButtonContributionRequestColors from './colors/useNodeButtonContributionRequestColors';
import useNodeButtonDefaultColors from './colors/useNodeButtonDefaultColors';
import useTreeContext from './useTreeContext';
import { TreeType } from '../../nodes.types';

export default function useNodeColors() {
    const defaultColors = useNodeButtonDefaultColors();
    const checkboxColors = useNodeButtonCheckboxColors();
    const contributionRequestColors = useNodeButtonContributionRequestColors();

    const { type: treeType } = useTreeContext();

    if (treeType === TreeType.Checkbox) {
        return checkboxColors;
    }

    if (treeType === TreeType.ContributionRequest) {
        return contributionRequestColors;
    }

    return defaultColors;
}
