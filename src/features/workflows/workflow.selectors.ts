import { Workflow, WorkflowDiagramObject } from './workflow.types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectWorkflowsByBranchId = (state: RootState) => state.workflows.byBranchId;
export const selectRawSelectedWorkflowObject = (state: RootState) =>
    state.workflows.selectedWorkflowObject || {} as WorkflowDiagramObject;

export const selectSelectedWorkflowObject = createSelector(
    selectRawSelectedWorkflowObject,
    (selectedWorkflowObject) => selectedWorkflowObject,
);

/* diagram */
export const selectWorkflowDiagramByBranchId = (state: RootState) => state.workflows.workflowDiagramByBranchId;
export const selectWorkflowScale = (state: RootState) => state.workflows.workflowScale;

export const selectWorkflowByBranchId = (branchId: UUID) => createSelector([
    selectWorkflowsByBranchId,
], (workflowsByBranchId) => workflowsByBranchId[branchId]);

export const selectWorkflow = (branchId: UUID, workflowId: UUID) => createSelector(
    selectWorkflowByBranchId(branchId),
    (workflowsByBranchId) => workflowsByBranchId[workflowId],
);

export const selectWorkflowDiagram = (branchId: UUID, workflowId: UUID) => createSelector(
    selectWorkflowDiagramByBranchId,
    (workflowDiagramByBranchId) => workflowDiagramByBranchId[branchId][workflowId],
);

export const selectWorkflowAttribute = <K extends keyof Workflow>(
    branchId: UUID,
    workflowId: UUID,
    attribute: K,
) => createSelector(selectWorkflow(branchId, workflowId), (workflow) => workflow && workflow[attribute]);
