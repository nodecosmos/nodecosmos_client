import { createSelector } from '@reduxjs/toolkit';

export const selectInputOutputsById = (state) => state.inputOutputs.byId;

export const selectInputOutputs = (ids) => createSelector(
  selectInputOutputsById,
  (inputOutputsById) => ids.map((id) => inputOutputsById[id]),
);
