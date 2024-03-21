import { FlowStepPrimaryKey } from './flowSteps.types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

const selectFlowStepsByBranchId = (state: RootState) => state.flowSteps.byBranchId;

const selectFlowStepsByBranch = (branchId: UUID) => createSelector(
    selectFlowStepsByBranchId,
    (flowStepsById) => flowStepsById[branchId],
);

export const selectFlowStep = (branchId: UUID, id: UUID) => createSelector(
    selectFlowStepsByBranch(branchId),
    (flowStepsById) => flowStepsById[id],
);

export const selectOptFlowStep = (branchId: UUID, id?: UUID) => createSelector(
    selectFlowStepsByBranch(branchId),
    (flowStepsById) => id ? flowStepsById[id] : null,
);

export const selectFlowStepPrimaryKey = (branchId: UUID, id: UUID) => createSelector(
    selectFlowStep(branchId, id),
    (flowStep): FlowStepPrimaryKey| null => {
        if (!flowStep) return null;

        return {
            nodeId: flowStep.nodeId,
            branchId: flowStep.branchId,
            workflowId: flowStep.workflowId,
            flowId: flowStep.flowId,
            flowIndex: flowStep.flowIndex,
            id: flowStep.id,
        };
    },
);

export const selectFlowStepsByWorkflowId = (branchId: UUID, workflowId: UUID) => createSelector(
    selectFlowStepsByBranch(branchId),
    (flowSteps) => Object.values(flowSteps || {})
        .filter((flowStep) => flowStep.workflowId === workflowId)
        .sort((a, b) => a.flowIndex - b.flowIndex),
);
