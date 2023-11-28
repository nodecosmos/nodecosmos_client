import appSlice from './features/app/appSlice';
import authSlice from './features/authentication/authenticationSlice';
import contributionRequestSlice from './features/contribution-requests/contributionRequestsSlice';
import flowStepsSlice from './features/flow-steps/flowStepsSlice';
import flowsSlice from './features/flows/flowsSlice';
import homeSlice from './features/home/homeSlice';
import landingPageNodeSlice from './features/home-tree/landingPageNodeSlice';
import inputOutputsSlice from './features/input-outputs/inputOutputsSlice';
import likesSlice from './features/likes/likesSlice';
import nodesSlice from './features/nodes/nodesSlice';
import workflowsSlice from './features/workflows/workflowsSlice';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
    app: appSlice,
    auth: authSlice,
    nodes: nodesSlice,
    landingPageNodes: landingPageNodeSlice,
    home: homeSlice,
    likes: likesSlice,
    workflows: workflowsSlice,
    flows: flowsSlice,
    flowSteps: flowStepsSlice,
    inputOutputs: inputOutputsSlice,
    contributionRequests: contributionRequestSlice,
});
