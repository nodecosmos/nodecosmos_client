import { createSelector } from '@reduxjs/toolkit';

export const selectInputOutputsById = (state) => state.inputOutputs.byId;

export const selectInputOutputs = (ids) => createSelector(
  selectInputOutputsById,
  (inputOutputsById) => ids.map((id) => inputOutputsById[id]),
);

export const selectInputOutputById = (id) => createSelector(
  selectInputOutputsById,
  (inputOutputsById) => inputOutputsById[id],
);

export const selectIOAttribute = (id, attribute) => createSelector(
  selectInputOutputById(id),
  (inputOutput) => inputOutput && inputOutput[attribute],
);
