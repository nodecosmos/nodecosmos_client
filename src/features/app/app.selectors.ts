import { AppState, TransformablePositions } from './app.types';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

interface State {
    app: AppState;
}

export const selectTransformablePositionsById = (id: UUID) => (
    state: State,
) => state.app.transformablePositionsById[id];

export const selectTheme = (state: State) => state.app.theme;
export const selectHeaderContent = (state: State) => state.app.headerContent;
export const selectIsPaneOpen = (state: State) => state.app.isPaneOpen;

export const selectTransformablePositionAttribute = (
    id: UUID,
    attribute: keyof TransformablePositions,
) => createSelector(
    selectTransformablePositionsById(id),
    (transformablePosition) => transformablePosition && transformablePosition[attribute],
);
