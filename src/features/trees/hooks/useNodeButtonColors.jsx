import useNodeButtonDefaultColors from './colors/useNodeButtonDefaultColors';
import useNodeButtonCheckboxColors from './colors/useNodeButtonCheckboxColors';
import { useTreeCheckbox } from './useTreeContext';

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
  const { treeType } = useTreeCheckbox();
  const defaultColors = useNodeButtonDefaultColors(treeId);
  const checkboxColors = useNodeButtonCheckboxColors(treeId);

  if (treeType === 'checkbox') {
    return checkboxColors;
  }

  return defaultColors;
}
