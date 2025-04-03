import appSlice from './features/app/appSlice';
import branchesSlice from './features/branch/branchesSlice';
import commentsSlice from './features/comments/commentsSlice';
import contributionRequestSlice from './features/contribution-requests/contributionRequestsSlice';
import descriptionsSlice from './features/descriptions/descriptionsSlice';
import flowStepsSlice from './features/flow-steps/flowStepsSlice';
import flowsSlice from './features/flows/flowsSlice';
import inputOutputsSlice from './features/input-outputs/inputOutputsSlice';
import invitationsSlice from './features/invitations/invitationsSlice';
import likesSlice from './features/likes/likesSlice';
import nodesSlice from './features/nodes/nodesSlice';
import notificationsSlice from './features/notifications/notificationsSlice';
import subscriptionsSlice from './features/subscriptions/subscriptionsSlice';
import tasksSlice from './features/tasks/tasksSlice';
import usersSlice from './features/users/usersSlice';
import workflowsSlice from './features/workflows/workflowsSlice';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
    app: appSlice,
    nodes: nodesSlice,
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
    invitations: invitationsSlice,
    notifications: notificationsSlice,
    tasks: tasksSlice,
    subscriptions: subscriptionsSlice,
});
