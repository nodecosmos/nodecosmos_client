import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './features/authentication/authenticationSlice';
import nodesSlice from './features/nodes/nodesSlice';
import treesSlice from './features/trees/treesSlice';
import appSlice from './features/app/appSlice';
import landingPageNodeSlice from './features/home-tree/landingPageNodeSlice';
import landingPageWorkflowSlice from './features/home-workflow/landingPageWorkflowSlice';
import homeSlice from './features/home/homeSlice';
import likesSlice from './features/likes/likesSlice';
import workflowsSlice from './features/workflows/workflowsSlice';
import inputOutputsSlice from './features/input-outputs/inputOutputsSlice';
import flowsSlice from './features/flows/flowsSlice';
import flowStepsSlice from './features/flow-steps/flowStepsSlice';

export default combineReducers({
  app: appSlice,
  auth: authSlice,
  nodes: nodesSlice,
  trees: treesSlice,
  landingPageNodes: landingPageNodeSlice,
  landingPageWorkflows: landingPageWorkflowSlice,
  home: homeSlice,
  likes: likesSlice,
  workflows: workflowsSlice,
  flows: flowsSlice,
  flowSteps: flowStepsSlice,
  inputOutputs: inputOutputsSlice,
});
