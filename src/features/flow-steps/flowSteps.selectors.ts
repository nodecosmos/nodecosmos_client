import { FlowStepPrimaryKey } from './flowSteps.types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';
import Decimal from 'decimal.js';

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
            flowId: flowStep.flowId,
            stepIndex: flowStep.stepIndex,
            id: flowStep.id,
        };
    },
);

export const selectFlowStepsByNodeId = (branchId: UUID, nodeId: UUID) => createSelector(
    selectFlowStepsByBranch(branchId),
    (flowSteps) => Object.values(flowSteps || {})
        .sort((a, b) => new Decimal(a.stepIndex).cmp(b.stepIndex))
        .filter((flowStep) => flowStep.nodeId === nodeId),
);
