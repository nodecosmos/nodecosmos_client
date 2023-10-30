import {
    Flow, FlowPrimaryKey, FlowState,
} from './types';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

interface State {
    flows: FlowState;
}

export const selectFlowPaneContent = (state: State) => state.flows.flowPaneContent;
const selectFlowById = (state: State) => state.flows.byId;

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
