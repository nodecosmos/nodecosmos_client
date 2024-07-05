import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

const selectInputOutputsByBranchId = (state: RootState) => state.inputOutputs.byBranchId;

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

// TODO: when we change title or description of the ios, we do it by mainId. In case main id io is deleted, we
//  would need to query first where mainId matches provided ids.
export const selectIosByIds = (branchId: UUID, ids: Set<UUID>) => createSelector(
    selectInputOutputsByBranch(branchId),
    (inputOutputsById) => {
        return Array.from(ids).map((id) => inputOutputsById && inputOutputsById[id]).filter((io) => !!io);
    },
);
