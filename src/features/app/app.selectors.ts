import { TransformablePositions } from './app.types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectTransformablePositionsById = (id: UUID) => (
    state: RootState,
) => state.app.transformablePositionsById[id];
export const selectTheme = (state: RootState) => state.app.theme;
export const selectHeaderContent = (state: RootState) => state.app.headerContent;
export const selectIsPaneOpen = (state: RootState) => state.app.isPaneOpen;
export const selectAlert = (state: RootState) => state.app.alert;
export const selectTransformablePositionAttribute = (
    id: UUID,
    attribute: keyof TransformablePositions,
) => createSelector(
    selectTransformablePositionsById(id),
    (transformablePosition) => transformablePosition && transformablePosition[attribute],
);
export const selectSelectedObject = (state: RootState) => state.app.selectedObject;
