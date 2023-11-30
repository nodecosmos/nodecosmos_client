import { NodecosmosTheme } from '../../../../../themes/type';
import { selectNodeAttribute } from '../../../nodes.selectors';
import useNodeContext from '../useNodeContext';
import useTreeCommands from '../useTreeCommands';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function useNodeButtonCheckboxColors() {
    const {
        treeBranchId, id, isRoot,
    } = useNodeContext();

    const nestedLevel = useSelector(selectNodeAttribute(treeBranchId, id, 'nestedLevel'));
    const theme: NodecosmosTheme = useTheme();

    const commands = useTreeCommands();

    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedTreeColor = backgrounds[nestedLevel % backgroundCount];
    const { checkboxColor } = theme.palette.tree;

    const isChecked = commands.isChecked(id);
    const outlinedColored = isChecked;
    const backgroundColor = isChecked ? theme.palette.background[3] : theme.palette.tree.default;

    const color = (isChecked && nestedTreeColor) || theme.palette.tree.defaultText;
    const parentBackgroundColor = isRoot
        ? theme.palette.tree.default : backgrounds[(nestedLevel - 1) % backgroundCount];

    const outlineColor = isChecked ? nestedTreeColor : checkboxColor;

    return {
        backgroundColor,
        outlineColor,
        parentBackgroundColor,
        color,
        hasBg: false,
        outlinedColored,
        nestedTreeColor,
    };
}
