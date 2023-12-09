import { Flow, FlowPrimaryKey } from './types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectFlowPaneContent = (state: RootState) => state.flows.flowPaneContent;
const selectFlowById = (state: RootState) => state.flows.byId;

export const selectFlow = (flowId?: UUID | null) => createSelector(
    selectFlowById,
    (flows) => (flowId && flows[flowId]) || {} as Flow,
);

export const selectFlowAttribute = <K extends keyof Flow>(flowId: UUID | null, attribute: K) => createSelector(
    selectFlow(flowId),
    (flow) => (flowId && flow[attribute]) || null,
);

export const selectFlowsByWorkflowId = (workflowId: UUID | null) => createSelector(
    selectFlowById,
    (flows) => Object.values(flows).filter(
        (flow) => flow.workflowId === workflowId,
    ),
);

export const selectFlowPrimaryKey = (flowId: UUID) => createSelector(
    selectFlow(flowId),
    (flow): FlowPrimaryKey => ({
        nodeId: flow.nodeId,
        workflowId: flow.workflowId,
        startIndex: flow.startIndex,
        verticalIndex: flow.verticalIndex,
        id: flow.id,
    }),
);
