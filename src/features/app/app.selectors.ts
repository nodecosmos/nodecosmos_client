import { RootState } from '../../store';

export const selectTheme = (state: RootState) => state.app.theme;
export const selectHeaderContent = (state: RootState) => state.app.headerContent;
export const selectIsPaneOpen = (state: RootState) => state.app.isPaneOpen;
export const selectIsPaneLoading = (state: RootState) => state.app.isPaneLoading;
export const selectAlert = (state: RootState) => state.app.alert;
export const selectSelectedObject = (state: RootState) => state.app.selectedObject;
export const selectCurrentNode = (state: RootState) => state.app.currentNode;
