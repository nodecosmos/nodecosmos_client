import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './features/authentication/authenticationSlice';
import nodesSlice from './features/nodes/nodesSlice';
import treesSlice from './features/trees/treesSlice';
import appSlice from './features/app/appSlice';
import landingPageNodeSlice from './features/home-tree/landingPageNodeSlice';
import homeSlice from './features/home/homeSlice';
import likesSlice from './features/likes/likesSlice';
import workflowsSlice from './features/workflows/workflowsSlice';
import inputOutputsSlice from './features/input-outputs/inputOutputsSlice';
import flowsSlice from './features/flows/flowsSlice';
import flowStepsSlice from './features/flow-steps/flowStepsSlice';
import contributionRequestSlice from './features/contribution-requests/contributionRequestsSlice';

export default combineReducers({
  app: appSlice,
  auth: authSlice,
  nodes: nodesSlice,
  trees: treesSlice,
  landingPageNodes: landingPageNodeSlice,
  home: homeSlice,
  likes: likesSlice,
  workflows: workflowsSlice,
  flows: flowsSlice,
  flowSteps: flowStepsSlice,
  inputOutputs: inputOutputsSlice,
  contributionRequests: contributionRequestSlice,
});
