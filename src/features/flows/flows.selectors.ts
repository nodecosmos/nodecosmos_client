import { createSelector } from '@reduxjs/toolkit';
import { UUID } from '../../types';
import { Flow, FlowState } from './types';

export const selectFlowPaneContent = (state: { flows: FlowState; }) => state.flows.flowPaneContent;
export const selectFlowById = (state: { flows: FlowState; }) => state.flows.byId;

export const selectFlow = (flowId: UUID) => createSelector(
    selectFlowById,
    (flows) => flows && flows[flowId],
);

export const selectFlowAttribute = <K extends keyof Flow>(
    flowId: UUID,
    attribute: K,
) => createSelector(
        selectFlow(flowId),
        (flow) => flow && flow[attribute],
    );
