import { InputOutput } from './inputOutputs.types';
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

export const selectIoAttribute = (branchId: UUID, id: UUID, attribute: keyof InputOutput) => createSelector(
    selectInputOutput(branchId, id),
    (inputOutput) => inputOutput ? inputOutput[attribute] : null,
);

export const selectIoByNodeId = (branchId: UUID, nodeId: UUID) => createSelector(
    selectInputOutputsByBranch(branchId),
    (inputOutputsById) => Object.values(inputOutputsById || {}).filter(
        (inputOutput) => inputOutput.nodeId === nodeId,
    ),
);

export const selectUniqueIoByrootId = (branchId: UUID, rootId: UUID) => createSelector(
    selectInputOutputsByBranch(branchId),
    (inputOutputsById) => Object.values(inputOutputsById || {}).filter(
        (inputOutput) => inputOutput.rootId === rootId,
    ),
);
