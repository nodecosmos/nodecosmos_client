import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectInputOutputsByBranchId = (state: RootState) => state.inputOutputs.byBranchId;

export const selectInputOutputsByBranch = (branchId: UUID) => createSelector(
    selectInputOutputsByBranchId,
    (inputOutputsById) => inputOutputsById[branchId],
);

export const selectInputOutput = (branchId: UUID, id: UUID) => createSelector(
    selectInputOutputsByBranch(branchId),
    (inputOutputsById) => inputOutputsById[id],
);

export const selectIoByNodeId = (branchId: UUID, nodeId: UUID) => createSelector(
    selectInputOutputsByBranch(branchId),
    (inputOutputsById) => Object.values(inputOutputsById || {}).filter(
        (inputOutput) => inputOutput.nodeId === nodeId,
    ),
);

export const selectUniqueIoByRootId = (branchId: UUID, rootId: UUID) => createSelector(
    selectInputOutputsByBranch(branchId),
    (inputOutputsById) => Object.values(inputOutputsById || {}).filter(
        (inputOutput) => inputOutput.rootId === rootId,
    ),
);
