import { InputOutput } from './inputOutputs.types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectInputOutputsByBranchId = (state: RootState) => state.inputOutputs.byBranchId;
export const selectIoPaneContent = (state: RootState) => state.inputOutputs.IoPaneContent;

export const selectInputOutputsByBranch = (branchId: UUID) => createSelector(
    selectInputOutputsByBranchId,
    (inputOutputsById) => inputOutputsById[branchId],
);

export const selectInputOutput = (branchId: UUID, id: UUID) => createSelector(
    selectInputOutputsByBranch(branchId),
    (inputOutputsById) => inputOutputsById[id],
);

export const selectInputOutputPrimaryKey = (branchId: UUID, id: UUID) => createSelector(
    selectInputOutput(branchId, id),
    (io) => ({
        rootNodeId: io.rootNodeId,
        nodeId: io.nodeId,
        branchId: io.branchId,
        workflowId: io.workflowId,
        id: io.id,
    }),
);

export const selectIoAttribute = (branchId: UUID, id: UUID, attribute: keyof InputOutput) => createSelector(
    selectInputOutput(branchId, id),
    (inputOutput) => inputOutput ? inputOutput[attribute] : null,
);

export const selectIoByWorkflowId = (branchId: UUID, workflowId: UUID) => createSelector(
    selectInputOutputsByBranch(branchId),
    (inputOutputsById) => Object.values(inputOutputsById || {}).filter(
        (inputOutput) => inputOutput.workflowId === workflowId,
    ),
);

export const selectUniqueIoByRootNodeId = (branchId: UUID, rootNodeId: UUID) => createSelector(
    selectInputOutputsByBranch(branchId),
    (inputOutputsById) => Object.values(inputOutputsById || {}).filter(
        (inputOutput) => inputOutput.rootNodeId === rootNodeId,
    ),
);
