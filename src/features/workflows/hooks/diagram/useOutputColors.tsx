import useFlowStepContext from './flow-step/useFlowStepContext';
import useIoContext from './io/useIoContext';
import useDiffColors, { DiffState } from '../../../../common/hooks/useDiffColors';
import { NodecosmosTheme } from '../../../../themes/type';
import useBranchParams from '../../../branch/hooks/useBranchParams';
import { selectOptNode } from '../../../nodes/nodes.selectors';
import useWorkflowBranch from '../useWorkflowBranch';
import useWorkflowContext from '../useWorkflowContext';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function useOutputColors() {
    const theme: NodecosmosTheme = useTheme();
    const {
        id, mainId, isSelected, fsNodeId, isNodeSelected, selectedNodeId,
    } = useIoContext();
    const { branchId } = useWorkflowContext();
    const {
        isIoCreated, isIoDeleted, isIoTitleEdited, isIoDescriptionEdited, isFlowStepCreated, isFlowStepDeleted,
    } = useWorkflowBranch();
    const { isBranch } = useBranchParams();
    const diffColors = useDiffColors();
    const fsNode = useSelector(selectOptNode(branchId, fsNodeId));
    const nestedLevel = fsNode?.ancestorIds?.length || 0;
    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedLevelColor = backgrounds[nestedLevel % backgroundCount];

    const selectedNode = useSelector(selectOptNode(branchId, selectedNodeId));
    const selectedNodeNestedLevel = selectedNode?.ancestorIds?.length || 0;
    const selectedNodeNestedLevelColor = backgrounds[selectedNodeNestedLevel % backgroundCount];
    const { id: flowStepId } = useFlowStepContext();

    let colors = {
        backgroundColor: isSelected ? nestedLevelColor : theme.palette.background[6],
        outlineColor: isSelected ? nestedLevelColor : theme.palette.workflow.defaultInputColor,
        color: isSelected ? theme.palette.tree.selectedText : theme.palette.tree.defaultText,
    };

    if (isNodeSelected) {
        colors = {
            backgroundColor: selectedNodeNestedLevelColor,
            outlineColor: selectedNodeNestedLevelColor,
            color: theme.palette.tree.selectedText,
        };
    } else if (isBranch) {
        if (isFlowStepDeleted(flowStepId)) {
            colors = diffColors(isSelected, DiffState.Removed);
        }
        else if (isIoCreated(id) || isFlowStepCreated(flowStepId)) {
            colors = diffColors(isSelected, DiffState.Added);
        } else if (isIoDeleted(id)) {
            colors = diffColors(isSelected, DiffState.Removed);
        } else if (isIoTitleEdited(id) || isIoDescriptionEdited(mainId)) {
            colors = diffColors(isSelected, DiffState.Edited);
        }
    }

    return {
        ...colors,
        checkboxColor: selectedNodeNestedLevelColor,
    };
}
