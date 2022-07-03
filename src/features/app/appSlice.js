import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: localStorage.getItem('theme') || 'dark',
    subtitle: '',
    appAnimationEnabled: true,
  },
  reducers: {
    setTheme(state, action) { state.theme = action.payload; },
    setSubtitle(state, action) { state.subtitle = action.payload; },
    setCurrentNode(state, action) { state.currentNodeID = action.payload; },
    setCurrentToolbar(state, action) { state.currentToolbar = action.payload; },
    setAnimationEnabled(state, action) { state.animationEnabled = action.payload; },
  },
});

const { actions, reducer } = appSlice;

export const {
  setTheme,
  setSubtitle,
  setCurrentNode,
  setCurrentToolbar,
  setAnimationEnabled,
} = actions;

export default reducer;
