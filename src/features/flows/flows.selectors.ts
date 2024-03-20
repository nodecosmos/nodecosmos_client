import { Flow, FlowPrimaryKey } from './flows.types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectFlowPaneContent = (state: RootState) => state.flows.flowPaneContent;
const selectFlowByBranch = (state: RootState) => state.flows.byBranchId;

export const selectFlowByBranchId = (branchId: UUID) => createSelector(
    selectFlowByBranch,
    (flows) => flows[branchId] || {},
);

export const selectFlow = (branchId: UUID, flowId: UUID) => createSelector(
    selectFlowByBranchId(branchId),
    (flows) => flows[flowId],
);

export const selectOptFlow = (branchId: UUID, flowId: UUID | null) => createSelector(
    selectFlowByBranchId(branchId),
    (flows) => flowId && flows[flowId],
);

export const selectFlowAttribute = <K extends keyof Flow>(branchId: UUID, flowId: UUID, attribute: K) => createSelector(
    selectFlow(branchId, flowId),
    (flow) => (flowId && flow[attribute]) || null,
);

export const selectFlowsByWorkflowId = (branchId: UUID, workflowId: UUID | null) => createSelector(
    selectFlowByBranchId(branchId),
    (flows) => Object.values(flows).filter(
        (flow) => flow.workflowId === workflowId,
    ),
);

export const selectFlowPrimaryKey = (branchId: UUID, flowId: UUID) => createSelector(
    selectFlow(branchId, flowId),
    (flow): FlowPrimaryKey => ({
        nodeId: flow.nodeId,
        branchId: flow.branchId,
        workflowId: flow.workflowId,
        startIndex: flow.startIndex,
        verticalIndex: flow.verticalIndex,
        id: flow.id,
    }),
);
