import { NodecosmosTheme } from '../../../../../../themes/themes.types';
import useTreeActions from '../../useTreeActions';
import useNodeContext from '../useNodeContext';
import { useTheme } from '@mui/material';

export default function useNodeCheckboxColors() {
    const {
        id, isRoot, nestedLevel,
    } = useNodeContext();
    const theme: NodecosmosTheme = useTheme();

    const commands = useTreeActions();

    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedTreeColor = backgrounds[nestedLevel % backgroundCount].fg;
    const { checkboxColor } = theme.palette.tree;

    const isChecked = commands.isChecked(id);
    const outlinedColored = isChecked;
    const backgroundColor = isChecked ? theme.palette.background[3] : theme.palette.tree.default;

    const color = (isChecked && nestedTreeColor) || theme.palette.tree.defaultText;
    const parentBackgroundColor = isRoot
        ? theme.palette.tree.default : backgrounds[(nestedLevel - 1) % backgroundCount].fg;

    const outlineColor = isChecked ? nestedTreeColor : checkboxColor;

    return {
        backgroundColor,
        outlineColor,
        parentBackgroundColor,
        color,
        isSelected: false,
        outlinedColored,
        nestedTreeColor,
    };
}
