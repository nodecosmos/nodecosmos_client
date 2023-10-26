import { createSelector } from '@reduxjs/toolkit';
import memoize from 'lodash/memoize';

export const selectInputOutputsById = (state) => state.inputOutputs.byId;
export const selectIOPaneContent = (state) => state.inputOutputs.IOPaneContent;

export const makeSelectInputOutputs = memoize(
    (ids) => createSelector(
        selectInputOutputsById,
        (inputOutputsById) => ids && ids.map((id) => inputOutputsById[id]),
    ),
    (ids) => JSON.stringify(ids), // Generate cache key based on ids argument
);

export const selectInputOutputs = (ids) => createSelector(
    selectInputOutputsById,
    (inputOutputsById) => ids && ids.map((id) => inputOutputsById[id]),
);

export const selectInputOutputById = (id) => createSelector(
    selectInputOutputsById,
    (inputOutputsById) => inputOutputsById[id],
);

export const selectInputOutputPrimaryKey = (id) => createSelector(
    selectInputOutputById(id),
    (io) => ({
        rootNodeId: io.rootNodeId,
        nodeId: io.nodeId,
        workflowId: io.workflowId,
        id: io.id,
    }),
);

export const selectIOAttribute = (id, attribute) => createSelector(
    selectInputOutputById(id),
    (inputOutput) => inputOutput && inputOutput[attribute],
);

export const selectIOByWorkflowId = (workflowId) => createSelector(
    selectInputOutputsById,
    (inputOutputsById) => Object.values(inputOutputsById).filter(
        (inputOutput) => inputOutput.workflowId === workflowId,
    ),
);

export const selectUniqueIOByRootNodeId = (rootNodeId) => createSelector(
    selectInputOutputsById,
    (inputOutputsById) => Object.values(inputOutputsById).filter(
        (inputOutput) => inputOutput.rootNodeId === rootNodeId,
    ),
);
