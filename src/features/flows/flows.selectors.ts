import { createSelector } from '@reduxjs/toolkit';
import { UUID } from '../../types';
import { Flow, FlowState } from './types';

interface State {
    flows: FlowState;
}

export const selectFlowPaneContent = (state: State) => state.flows.flowPaneContent;
const selectFlowById = (state: State) => state.flows.byId;

export const selectFlow = (flowId?: UUID | null) => createSelector(
    selectFlowById,
    (flows) => flowId && flows[flowId] || {} as Flow,
);

export const selectFlowAttribute = <K extends keyof Flow>(flowId: UUID | null, attribute: K) => createSelector(
    selectFlow(flowId),
    (flow) => flowId && flow[attribute] || null,
);

export const selectFlowsByWorkflowId = (workflowId: UUID | null) => createSelector(
    selectFlowById,
    (flows) => Object.values(flows).filter(
        (flow) => flow.workflowId === workflowId,
    ),
);
