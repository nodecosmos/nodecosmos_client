import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: localStorage.getItem('theme') || 'dark',
    subtitle: '',
    appAnimationEnabled: true,
    scrollEnabled: true,
    currentNodeID: null,
  },
  reducers: {
    setTheme(state, action) { state.theme = action.payload; },
    setSubtitle(state, action) { state.subtitle = action.payload; },
    setCurrentNode(state, action) { state.currentNodeID = action.payload; },
    setCurrentToolbar(state, action) { state.currentToolbar = action.payload; },
    setAnimationEnabled(state, action) { state.animationEnabled = action.payload; },
    setScrollEnabled(state, action) { state.scrollEnabled = action.payload; },
  },
});

const { actions, reducer } = appSlice;

export const {
  setTheme,
  setSubtitle,
  setCurrentNode,
  setCurrentToolbar,
  setAnimationEnabled,
  setScrollEnabled,
} = actions;

export default reducer;
