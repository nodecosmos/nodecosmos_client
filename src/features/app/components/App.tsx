import Header from './header/Header';
import NotFound from '../../../common/components/404';
import ContactUs from '../../../pages/ContactUs';
import ContributionRequestIndex from '../../../pages/contribution-requests/Index';
import ContributionRequestShow from '../../../pages/contribution-requests/Show';
import ContributionRequestCommits from '../../../pages/contribution-requests/tabs/ContributionRequestCommits';
import ContributionRequestConversation from '../../../pages/contribution-requests/tabs/ContributionRequestConversation';
import ContributionRequestTree from '../../../pages/contribution-requests/tabs/ContributionRequestTree';
import ContributionRequestWorkflow from '../../../pages/contribution-requests/tabs/ContributionRequestWorkflow';
import Activity from '../../../pages/contribution-requests/tabs/conversation-tabs/Activity';
import MainThread from '../../../pages/contribution-requests/tabs/conversation-tabs/MainThread';
import Invite from '../../../pages/invitations/Invite';
import NodesIndex from '../../../pages/nodes/Index';
import NodeShow from '../../../pages/nodes/Show';
import SubscriptionShow from '../../../pages/nodes/Subscription';
import TeamShow from '../../../pages/nodes/TeamShow';
import TreeShow from '../../../pages/nodes/TreeShow';
import WorkflowShow from '../../../pages/nodes/WorkflowShow';
import ThreadsIndex from '../../../pages/threads/Index';
import ThreadNew from '../../../pages/threads/New';
import ThreadShow from '../../../pages/threads/Show';
import UserAuthentication from '../../../pages/users/Authentication';
import ResetPassword from '../../../pages/users/ResetPassword';
import UserShow from '../../../pages/users/Show';
import { NodecosmosDispatch } from '../../../store';
import getTheme, { themes } from '../../../themes/theme';
import LoginForm from '../../users/components/LoginForm';
import Bio from '../../users/components/profile/Bio';
import RootNodes from '../../users/components/profile/RootNodes';
import SignupForm from '../../users/components/SignupForm';
import { selectIsAuthenticated } from '../../users/users.selectors';
import { syncUpCurrentUser } from '../../users/users.thunks';
import { selectTheme } from '../app.selectors';
import { THEME_STRING } from '../app.types';
import { HEADER_HEIGHT } from '../constants';
import useConfirmEmailAlert from '../hooks/useConfirmEmailAlert';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Navigate, Route, Routes,
} from 'react-router-dom';

export default function App() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const themeIdx = useSelector(selectTheme);
    const currentTheme = useMemo(() => themes[themeIdx], [themeIdx]);
    const theme = useMemo(() => getTheme(currentTheme), [currentTheme]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(syncUpCurrentUser());
        }
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            if ('serviceWorker' in navigator) {
                const scriptUrl = import.meta.env.MODE === 'development' ? '/workers/sse.ts'
                    : '/serviceWorker.js';

                navigator.serviceWorker.register(new URL(scriptUrl, import.meta.url).href, { type: 'module' })
                    .then(registration => {
                        console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    }, err => {
                        console.error('ServiceWorker registration failed: ', err);
                    });
            }
        }

        return () => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    for (const registration of registrations) {
                        registration.unregister();
                    }
                });
            }
        };
    }, [isAuthenticated]);

    useConfirmEmailAlert();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={`background-2 h-100 ${THEME_STRING[themeIdx]}`}>
                <Header />
                <Routes>
                    <Route
                        path="/auth"
                        element={isAuthenticated
                            ? <Navigate to="/" /> : <UserAuthentication />}
                    >
                        <Route path="login" element={<LoginForm />} />
                        <Route path="signup" element={<SignupForm />} />
                    </Route>
                </Routes>
                <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
                    <Routes>
                        {/* eslint-disable-next-line max-len */}
                        <Route path="/nodes/charybdis" element={<Navigate relative="route" to="/nodes/1b73a5fa-3662-4bc5-bb1e-42c710fd9bd4/1b73a5fa-3662-4bc5-bb1e-42c710fd9bd4" />} />
                        {/* eslint-disable-next-line max-len */}
                        <Route path="/nodes/workflow-sample" element={<Navigate relative="route" to="/f70f9de4-b938-4abc-9695-3b1cb7769f38/006546a7-9824-4727-ba8f-7a8c27b9cb2f/workflow?selectedObject=eyJvcmlnaW5hbElkIjoiZjcwZjlkZTQtYjkzOC00YWJjLTk2OTUtM2IxY2I3NzY5ZjM4IiwiYnJhbmNoSWQiOiJmNzBmOWRlNC1iOTM4LTRhYmMtOTY5NS0zYjFjYjc3NjlmMzgiLCJvYmplY3ROb2RlSWQiOiIwMDY1NDZhNy05ODI0LTQ3MjctYmE4Zi03YThjMjdiOWNiMmYiLCJvYmplY3RJZCI6IjJiZTVjZmFlLTg1MDMtNGQ0Mi1iNzQxLWU4NjI2Nzg3MzY3NiIsIm9iamVjdFR5cGUiOiJJbyIsIm1ldGFkYXRhIjp7Im1haW5PYmplY3RJZCI6IjJiZTVjZmFlLTg1MDMtNGQ0Mi1iNzQxLWU4NjI2Nzg3MzY3NiIsImZsb3dTdGVwTm9kZUlkIjpudWxsfX0%3D" />} />
                        <Route path="404" element={<NotFound />} />
                        <Route path="reset_password" element={<ResetPassword />} />
                        <Route path="/:username" element={<UserShow />}>
                            <Route path="" element={<Bio />} />
                            <Route path="nodes" element={<RootNodes />} />
                        </Route>
                        <Route path="/nodes" element={(<NodesIndex />)} />
                        <Route path="/" element={(<NodesIndex />)} />
                        <Route path="/nodes" element={<NodeShow />}>
                            <Route path=":originalId/:id" element={<TreeShow />} />

                            <Route path=":originalId/:id">
                                {/*Workflows*/}
                                <Route path="workflow" element={<WorkflowShow />} />

                                {/*Contribution Requests*/}
                                <Route path="contribution_requests" element={<ContributionRequestIndex />} />
                                <Route path="contribution_requests">
                                    <Route path=":branchId" element={<ContributionRequestShow />}>
                                        <Route path="" element={<ContributionRequestConversation />}>
                                            <Route path="" element={<MainThread />} />
                                            <Route path="activity" element={<Activity />} />
                                        </Route>
                                        <Route path="tree" element={<ContributionRequestTree />} />
                                        <Route path="workflow" element={<ContributionRequestWorkflow />} />
                                        <Route path="commits" element={<ContributionRequestCommits />} />
                                    </Route>
                                </Route>

                                {/*Threads*/}
                                <Route path="threads" element={<ThreadsIndex />} />
                                <Route path="threads/new" element={<ThreadNew />} />
                                <Route path="threads/:threadId" element={<ThreadShow />} />

                                {/*Tasks*/}
                                <Route path="tasks_board" element={<div />} />

                                {/*Settings*/}
                                <Route path="team" element={<TeamShow />} />

                                <Route path="subscriptions" element={<SubscriptionShow />} />

                            </Route>

                        </Route>
                        <Route path="/invitations" element={<Invite />} />
                        <Route path="/contact" element={<ContactUs />} />
                    </Routes>
                </Box>
            </div>
        </ThemeProvider>
    );
}
