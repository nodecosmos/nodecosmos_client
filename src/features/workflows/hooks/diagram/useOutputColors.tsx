import useFlowStepContext from './flow-step/useFlowStepContext';
import useDiffColors, { DiffState } from '../../../../common/hooks/useDiffColors';
import { NodecosmosTheme } from '../../../../themes/type';
import { selectSelectedObject } from '../../../app/app.selectors';
import useBranchParams from '../../../branch/hooks/useBranchParams';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import useWorkflowBranchContext from '../useWorkflowBranchContext';
import useWorkflowContext from '../useWorkflowContext';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

interface Props {
    id: string;
    nodeId: string;
}

export default function useOutputColors({ id, nodeId }: Props) {
    const theme: NodecosmosTheme = useTheme();
    const { branchId } = useWorkflowContext();
    const {
        isIoCreated, isIoDeleted, isIoTitleEdited, isIoDescriptionEdited, isFlowStepCreated, isFlowStepDeleted,
    } = useWorkflowBranchContext();
    const { isBranch } = useBranchParams();
    const diffColors = useDiffColors();
    const ancestorIds = useSelector(selectNodeAttribute(branchId, nodeId, 'ancestorIds'));
    const selectedObject = useSelector(selectSelectedObject);
    const selectedNodeAncestorIds
        = useSelector(selectNodeAttribute(branchId, nodeId, 'ancestorIds'));
    const nestedLevel = ancestorIds?.length || 0;
    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedLevelColor = backgrounds[nestedLevel % backgroundCount];
    const selectedNodeNestedLevel = selectedNodeAncestorIds?.length || 0;
    const selectedNodeNestedLevelColor = backgrounds[selectedNodeNestedLevel % backgroundCount];
    const { id: flowStepId } = useFlowStepContext();

    const isSelected = selectedObject?.objectId === id;

    let colors = {
        backgroundColor: isSelected ? nestedLevelColor : theme.palette.background[4],
        outlineColor: isSelected ? nestedLevelColor : theme.palette.workflow.defaultInputColor,
        color: isSelected ? theme.palette.tree.selectedText : theme.palette.tree.defaultText,
    };

    if (isBranch && !isFlowStepCreated(flowStepId)) {
        if (isFlowStepDeleted(flowStepId)) {
            colors = diffColors(isSelected, DiffState.Removed);
        }
        else if (isIoCreated(id)) {
            colors = diffColors(isSelected, DiffState.Added);
        } else if (isIoDeleted(id)) {
            colors = diffColors(isSelected, DiffState.Removed);
        } else if (isIoTitleEdited(id) || isIoDescriptionEdited(id)) {
            colors = diffColors(isSelected, DiffState.Edited);
        }
    }

    return {
        ...colors,
        checkboxColor: selectedNodeNestedLevelColor,
    };
}
