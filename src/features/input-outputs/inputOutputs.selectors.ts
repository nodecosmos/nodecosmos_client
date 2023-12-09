import { InputOutput } from './types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectInputOutputsById = (state: RootState) => state.inputOutputs.byId;
export const selectIOPaneContent = (state: RootState) => state.inputOutputs.IOPaneContent;

export const selectInputOutputById = (id: UUID) => createSelector(
    selectInputOutputsById,
    (inputOutputsById) => inputOutputsById[id],
);

export const selectInputOutputPrimaryKey = (id: UUID) => createSelector(
    selectInputOutputById(id),
    (io) => ({
        rootNodeId: io.rootNodeId,
        nodeId: io.nodeId,
        workflowId: io.workflowId,
        id: io.id,
    }),
);

export const selectIOAttribute = (id: UUID, attribute: keyof InputOutput) => createSelector(
    selectInputOutputById(id),
    (inputOutput) => inputOutput && inputOutput[attribute],
);

export const selectIOByWorkflowId = (workflowId: UUID) => createSelector(
    selectInputOutputsById,
    (inputOutputsById) => Object.values(inputOutputsById).filter(
        (inputOutput) => inputOutput.workflowId === workflowId,
    ),
);

export const selectUniqueIOByRootNodeId = (rootNodeId: UUID) => createSelector(
    selectInputOutputsById,
    (inputOutputsById) => Object.values(inputOutputsById).filter(
        (inputOutput) => inputOutput.rootNodeId === rootNodeId,
    ),
);
