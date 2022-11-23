import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './features/authentication/authenticationSlice';
import nodesSlice from './features/nodes/nodeSlice';
import appSlice from './features/app/appSlice';
import landingPageNodeSlice from './features/home/components/landing-page-tree/landingPageNodeSlice';
import landingPageWorkflowSlice from './features/home/components/landing-page-workflow/landingPageWorkflowSlice';

export default combineReducers({
  app: appSlice,
  auth: authSlice,
  nodes: nodesSlice,
  landingPageNodes: landingPageNodeSlice,
  landingPageWorkflows: landingPageWorkflowSlice,
});
