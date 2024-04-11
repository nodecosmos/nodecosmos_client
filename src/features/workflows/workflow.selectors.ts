import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectWorkflowsByBranchId = (state: RootState) => state.workflows.byBranchId;
export const selectWorkflowDiagramByBranchId = (state: RootState) => state.workflows.workflowDiagramByBranchId;

export const selectBranchWorkflowDiagram = (branchId: UUID) => createSelector(
    selectWorkflowDiagramByBranchId,
    (workflowDiagramByBranchId) => workflowDiagramByBranchId[branchId],
);

/* diagram */
export const selectWorkflowScale = (state: RootState) => state.workflows.workflowScale;

export const selectWorkflowByBranchId = (branchId: UUID) => createSelector([
    selectWorkflowsByBranchId,
], (workflowsByBranchId) => workflowsByBranchId[branchId]);

export const selectWorkflow = (branchId: UUID, nodeId: UUID) => createSelector(
    selectWorkflowByBranchId(branchId),
    (workflowsByBranchId) => workflowsByBranchId[nodeId],
);

export const selectWorkflowDiagram = (branchId: UUID, nodeId: UUID) => createSelector(
    selectBranchWorkflowDiagram(branchId),
    (branchWorkflowDiagrams) => branchWorkflowDiagrams[nodeId],
);

export const selectOptWorkflow = (branchId: UUID, nodeId: UUID) => createSelector(
    selectWorkflowByBranchId(branchId),
    (workflowsByBranchId) => {
        if (workflowsByBranchId) {
            return workflowsByBranchId[nodeId];
        }
        return null;
    },
);
