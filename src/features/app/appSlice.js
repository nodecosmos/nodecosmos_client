import { createSlice } from '@reduxjs/toolkit';

function fnBrowserDetect() {
  const { userAgent } = navigator;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = 'chrome';
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = 'firefox';
  } else if (userAgent.match(/safari/i)) {
    browserName = 'safari';
  } else if (userAgent.match(/opr\//i)) {
    browserName = 'opera';
  } else if (userAgent.match(/edg/i)) {
    browserName = 'edge';
  } else {
    browserName = 'No browser detection';
  }

  // console.log('browserName', browserName);
  return browserName;
}

const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: localStorage.getItem('theme') || 'dark',
    transformablePositionsById: {},
    subtitle: '',
    appAnimationEnabled: true,
    scrollEnabled: true,
    currentNodeId: null, // used for landing page
    browser: fnBrowserDetect(),
  },
  reducers: {
    setTheme(state, action) { state.theme = action.payload; },
    setSubtitle(state, action) { state.subtitle = action.payload; },
    setCurrentNode(state, action) { state.currentNodeId = action.payload; },
    setCurrentToolbar(state, action) { state.currentToolbar = action.payload; },
    setAnimationEnabled(state, action) { state.animationEnabled = action.payload; },
    setScrollEnabled(state, action) { state.scrollEnabled = action.payload; },
    setTransformablePositions(state, action) { state.transformablePositionsById[action.payload.id] = action.payload; },
  },
});

const { actions, reducer } = appSlice;

export const {
  setTheme,
  setSubtitle,
  setCurrentNode,
  setCurrentToolbar,
  setTransformablePositions,
} = actions;

export default reducer;
