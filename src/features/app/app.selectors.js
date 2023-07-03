import { createSelector } from '@reduxjs/toolkit';

export const selectTransformablePositionsById = (id) => (state) => state.app.transformablePositionsById[id] || {};
export const selectTheme = (state) => state.app.theme;
export const selectHeaderContent = (state) => state.app.headerContent;

export const selectTransformablePositionAttribute = (id, attribute) => createSelector(
  selectTransformablePositionsById(id),
  (transformablePosition) => transformablePosition[attribute],
);
