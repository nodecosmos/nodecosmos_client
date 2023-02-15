import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './features/authentication/authenticationSlice';
import nodesSlice from './features/nodes/nodesSlice';
import treesSlice from './features/trees/treesSlice';
import appSlice from './features/app/appSlice';
import landingPageNodeSlice from './features/home-tree/landingPageNodeSlice';
import landingPageWorkflowSlice from './features/home-workflow/landingPageWorkflowSlice';
import homeSlice from './features/home/homeSlice';

export default combineReducers({
  app: appSlice,
  auth: authSlice,
  nodes: nodesSlice,
  trees: treesSlice,
  landingPageNodes: landingPageNodeSlice,
  landingPageWorkflows: landingPageWorkflowSlice,
  home: homeSlice,
});
