import useFlowContext from './useFlowContext';
import useDiffColors, { DiffState } from '../../../../../common/hooks/useDiffColors';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import useWorkflowBranch from '../../useWorkflowBranch';
import useFlowStepColors from '../flow-step/useFlowStepColors';
import useFlowStepContext from '../flow-step/useFlowStepContext';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';

export default function useFlowColors() {
    const theme: NodecosmosTheme = useTheme();
    const { isBranch } = useBranchContext();
    const {
        isFlowCreated, isFlowDeleted, isFlowDeletedConflict, isFlowStepCreated, isFlowStepDeleted,
    } = useWorkflowBranch();
    const diffColors = useDiffColors();
    const { id, isSelected } = useFlowContext();
    const { id: flowStepId } = useFlowStepContext();
    const { backgroundColor: flowStepBg } = useFlowStepColors();

    return useMemo(() => {
        let colors = {
            backgroundColor: isSelected ? theme.palette.workflow.selectedBg : flowStepBg,
            outlineColor: isSelected ? theme.palette.workflow.selectedInputColor : theme.palette.borders[1],
            color: theme.palette.tree.defaultText,
        };

        if (isBranch && !isFlowStepCreated(flowStepId) && !isFlowStepDeleted(flowStepId)) {
            if (isFlowDeletedConflict(id)) {
                colors = diffColors(true, DiffState.Conflict, 0.1);
            } else if (isFlowCreated(id)) {
                colors = diffColors(true, DiffState.Added, 0.5);
            } else if (isFlowDeleted(id)) {
                colors = diffColors(true, DiffState.Removed, 0.5);
            }
        } else if (isBranch && isFlowStepCreated(flowStepId) && !isSelected) {
            colors.outlineColor = diffColors(true, DiffState.Added, 0.2).outlineColor;
        } else if (isBranch && isFlowStepDeleted(flowStepId) && !isSelected) {
            colors.outlineColor = diffColors(true, DiffState.Removed, 0.2).outlineColor;
        }

        return colors;
    },
    [
        isSelected, flowStepBg, id, flowStepId, isBranch,
        isFlowCreated, isFlowDeleted, isFlowDeletedConflict, isFlowStepCreated, isFlowStepDeleted,
        diffColors, theme,
    ]);
}
