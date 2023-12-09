import { FlowStep, FlowStepPrimaryKey } from './types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

const selectFlowSteps = (state: RootState) => state.flowSteps.byId;

export const selectFlowStep = (id: UUID | null) => createSelector(
    selectFlowSteps,
    (flowStepsByWorkflowId) => (id && flowStepsByWorkflowId[id]) || {} as FlowStep,
);

export const selectFlowStepPrimaryKey = (id: UUID | null) => createSelector(
    selectFlowStep(id),
    (flowStep): FlowStepPrimaryKey => ({
        nodeId: flowStep.nodeId,
        workflowId: flowStep.workflowId,
        flowId: flowStep.flowId,
        flowIndex: flowStep.flowIndex,
        id: flowStep.id,
    }),
);

export const selectFlowStepsByWorkflowId = (workflowId: UUID | null) => createSelector(
    selectFlowSteps,
    (flowSteps) => Object.values(flowSteps)
        .filter((flowStep) => flowStep.workflowId === workflowId)
        .sort((a, b) => a.flowIndex - b.flowIndex),
);
