import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

const selectFlowByBranch = (state: RootState) => state.flows.byBranchId;

export const selectFlowByBranchId = (branchId: UUID) => createSelector(
    selectFlowByBranch,
    (flows) => flows[branchId] || {},
);

export const selectFlow = (branchId: UUID, flowId: UUID) => createSelector(
    selectFlowByBranchId(branchId),
    (flows) => flows[flowId],
);

export const maybeSelectFlow = (branchId: UUID, flowId: UUID | null) => createSelector(
    selectFlowByBranchId(branchId),
    (flows) => flowId && flows[flowId],
);

export const selectFlowsByNodeId = (branchId: UUID, nodeId: UUID | null) => createSelector(
    selectFlowByBranchId(branchId),
    (flows) => Object.values(flows).filter(
        (flow) => flow.nodeId === nodeId,
    ),
);

export const selectFlowsByIds = (branchId: UUID, flowIds: Set<UUID>) => createSelector(
    selectFlowByBranchId(branchId),
    (flows) => Array.from(flowIds).map((flowId) => flows[flowId]),
);
