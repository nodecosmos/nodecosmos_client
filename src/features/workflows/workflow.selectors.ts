import { Workflow } from './workflow.types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectWorkflowsByBranchId = (state: RootState) => state.workflows.byBranchId;
export const selectIdByBranchAndNodeId = (state: RootState) => state.workflows.idByBranchAndNodeId;
export const selectWorkflowDiagramByBranchId = (state: RootState) => state.workflows.workflowDiagramByBranchId;

export const selectBranchWorkflowDiagram = (branchId: UUID) => createSelector(
    selectWorkflowDiagramByBranchId,
    (workflowDiagramByBranchId) => workflowDiagramByBranchId[branchId],
);

export const selectBranchNodeIds = (branchId: UUID) => createSelector(
    selectIdByBranchAndNodeId,
    (idsByBranchAndNodeId) => idsByBranchAndNodeId[branchId],
);

export const selectWorkflowIdByNodeId = (branchId: UUID, nodeId: UUID) => createSelector(
    selectBranchNodeIds(branchId),
    (idsByBranchAndNodeId) => idsByBranchAndNodeId[nodeId],
);

/* diagram */
export const selectWorkflowScale = (state: RootState) => state.workflows.workflowScale;

export const selectWorkflowByBranchId = (branchId: UUID) => createSelector([
    selectWorkflowsByBranchId,
], (workflowsByBranchId) => workflowsByBranchId[branchId]);

export const selectWorkflowByNodeId = (branchId: UUID, nodeId: UUID) => createSelector(
    selectWorkflowIdByNodeId(branchId, nodeId),
    selectWorkflowByBranchId(branchId),
    (workflowId, workflowsByBranchId) => workflowsByBranchId[workflowId],
);

export const selectWorkflow = (branchId: UUID, workflowId: UUID) => createSelector(
    selectWorkflowByBranchId(branchId),
    (workflowsByBranchId) => workflowsByBranchId[workflowId],
);

export const selectWorkflowDiagram = (branchId: UUID, workflowId: UUID) => createSelector(
    selectBranchWorkflowDiagram(branchId),
    (branchWorkflowDiagrams) => branchWorkflowDiagrams[workflowId],
);

export const selectOptWorkflowByBranchAndNodeId = (branchId: UUID, nodeId: UUID) => createSelector(
    selectWorkflowByBranchId(branchId),
    selectBranchNodeIds(branchId),
    (workflowsByBranchId, branchNodeIds) => {
        const workflowId = branchNodeIds && branchNodeIds[nodeId];
        if (workflowId) {
            return workflowsByBranchId[workflowId];
        }

        return null;
    },
);

export const selectWorkflowAttribute = <K extends keyof Workflow>(
    branchId: UUID,
    workflowId: UUID,
    attribute: K,
) => createSelector(selectWorkflow(branchId, workflowId), (workflow) => workflow && workflow[attribute]);
