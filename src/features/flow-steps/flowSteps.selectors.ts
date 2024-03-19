import { FlowStepPrimaryKey } from './types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

const selectFlowSteps = (state: RootState) => state.flowSteps.byId;

export const selectFlowStep = (id: UUID) => createSelector(
    selectFlowSteps,
    (flowStepsById) => flowStepsById[id],
);

export const selectFlowStepPrimaryKey = (id: UUID) => createSelector(
    selectFlowStep(id),
    (flowStep): FlowStepPrimaryKey| null => {
        if (!flowStep) return null;

        return {
            nodeId: flowStep.nodeId,
            workflowId: flowStep.workflowId,
            flowId: flowStep.flowId,
            flowIndex: flowStep.flowIndex,
            id: flowStep.id,
        };
    },
);

export const selectFlowStepsByWorkflowId = (workflowId: UUID) => createSelector(
    selectFlowSteps,
    (flowSteps) => Object.values(flowSteps)
        .filter((flowStep) => flowStep.workflowId === workflowId)
        .sort((a, b) => a.flowIndex - b.flowIndex),
);
