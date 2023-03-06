export const selectTransformablePositionsById = (id) => (state) => state.app.transformablePositionsById[id] || {};
export const selectTheme = (state) => state.app.theme;
export const selectHeaderContent = (state) => state.app.headerContent;
