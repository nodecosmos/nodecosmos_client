import appSlice from './features/app/appSlice';
import branchesSlice from './features/branch/branchesSlice';
import commentsSlice from './features/comments/commentsSlice';
import contributionRequestSlice from './features/contribution-requests/contributionRequestsSlice';
import descriptionsSlice from './features/descriptions/descriptionsSlice';
import flowStepsSlice from './features/flow-steps/flowStepsSlice';
import flowsSlice from './features/flows/flowsSlice';
import homeSlice from './features/home/homeSlice';
import landingPageNodeSlice from './features/home-tree/landingPageNodeSlice';
import inputOutputsSlice from './features/input-outputs/inputOutputsSlice';
import likesSlice from './features/likes/likesSlice';
import nodesSlice from './features/nodes/nodesSlice';
import usersSlice from './features/users/usersSlice';
import workflowsSlice from './features/workflows/workflowsSlice';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
    app: appSlice,
    nodes: nodesSlice,
    landingPageNodes: landingPageNodeSlice,
    home: homeSlice,
    likes: likesSlice,
    workflows: workflowsSlice,
    flows: flowsSlice,
    flowSteps: flowStepsSlice,
    inputOutputs: inputOutputsSlice,
    contributionRequests: contributionRequestSlice,
    branches: branchesSlice,
    users: usersSlice,
    comments: commentsSlice,
    descriptions: descriptionsSlice,
});
