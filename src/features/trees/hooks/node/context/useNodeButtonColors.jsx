import { TREES_TYPES } from '../../../trees.constants';
import useNodeButtonDefaultColors from '../../colors/useNodeButtonDefaultColors';
import useNodeButtonCheckboxColors from '../../colors/useNodeButtonCheckboxColors';
import useTreeContext from '../../useTreeContext';
import useNodeButtonContributionRequestColors from '../../colors/useNodeButtonContributionRequestColors';

/**
 *
 * @param treeId
 * @returns {{
 *   parentBackgroundColor: String,
 *   backgroundColor: String,
 *   outlinedColored: String,
 *   color: String,
 *   nestedTreeColor: String,
 *   outlineColor: String,
 *   hasBg: boolean
 * }}
 */
export default function useNodeButtonColors(treeId) {
    const { type: treeType } = useTreeContext();
    const defaultColors = useNodeButtonDefaultColors(treeId);
    const checkboxColors = useNodeButtonCheckboxColors(treeId);
    const contributionRequestColors = useNodeButtonContributionRequestColors(treeId);

    if (treeType === TREES_TYPES.checkbox) {
        return checkboxColors;
    }

    if (treeType === TREES_TYPES.contributionRequest) {
        return contributionRequestColors;
    }

    return defaultColors;
}
