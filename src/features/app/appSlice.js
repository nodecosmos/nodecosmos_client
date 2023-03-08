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
    headerContent: null,
    theme: localStorage.getItem('theme') || 'dark',
    transformablePositionsById: {},
    currentNodeId: null, // used for landing page
    browser: fnBrowserDetect(),
    alert: {
      isOpen: false,
      message: '',
      severity: 'info',
    },
  },
  reducers: {
    setHeaderContent(state, action) { state.headerContent = action.payload; },
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    setCurrentNode(state, action) { state.currentNodeId = action.payload; },
    setAnimationEnabled(state, action) { state.animationEnabled = action.payload; },
    setTransformablePositions(state, action) {
      const current = state.transformablePositionsById[action.payload.id] || {};
      state.transformablePositionsById[action.payload.id] = { ...current, ...action.payload };
    },
    setAlert(state, action) { state.alert = action.payload; },
  },
});

const { actions, reducer } = appSlice;

export const {
  setTheme,
  setCurrentNode,
  setHeaderContent,
  setTransformablePositions,
  setAlert,
} = actions;

export default reducer;
