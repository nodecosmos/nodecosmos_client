import { createSelector } from '@reduxjs/toolkit';
import { UUID } from '../../types';
import {
    FlowStep, FlowStepPrimaryKey, FlowStepState,
} from './types';

type State = { flowSteps: FlowStepState; }

const selectFlowSteps = (state: State) => state.flowSteps.byId;

export const selectFlowStep = (id: UUID | null) => createSelector(
    selectFlowSteps,
    (flowStepsByWorkflowId) => id && flowStepsByWorkflowId[id] || {} as FlowStep,
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
