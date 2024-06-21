import Header from './header/Header';
import NotFound from '../../../common/components/404';
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
import SignupForm from '../../users/components/SignupForm';
import { selectCurrentUser, selectIsAuthenticated } from '../../users/users.selectors';
import { syncUpCurrentUser } from '../../users/users.thunks';
import { selectTheme } from '../app.selectors';
import { setAlert } from '../appSlice';
import { HEADER_HEIGHT } from '../constants';
import { useAppContextCreator } from '../hooks/useAppContext';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Navigate, Route, Routes,
} from 'react-router-dom';

export default function App() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentUser = useSelector(selectCurrentUser);
    const theme = useSelector(selectTheme);
    const currentTheme = themes[theme];

    useEffect(() => {
        dispatch(syncUpCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                for (const registration of registrations) {
                    registration.unregister();
                }
            });
        }
    }, []);

    useEffect(() => {
        if (currentUser && !currentUser.isConfirmed) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'warning',
                message: `Please confirm your email address to access all features.
                if you didn't receive the email, please check your spam folder or request a new one from profile 
                options. If you still have issues, please write us at <b>support@nodecosmos.com</b>`,
                duration: 100000000,
            }));
        }
    }, [currentUser, dispatch]);

    const {
        AppContext,
        ctxValue,
    } = useAppContextCreator();

    return (
        <AppContext.Provider value={ctxValue}>
            <ThemeProvider theme={getTheme(currentTheme)}>
                <CssBaseline />
                <Box component="div" height={1} sx={{ backgroundColor: 'background.2' }}>
                    <Header />
                    <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
                        <Routes>
                            <Route
                                path="/auth"
                                element={isAuthenticated
                                    ? <Navigate to={`/${currentUser?.username}`} /> : <UserAuthentication />}
                            >
                                <Route path="login" element={<LoginForm />} />
                                <Route path="signup" element={<SignupForm />} />
                            </Route>
                            <Route path="404" element={<NotFound />} />
                            <Route path="reset_password" element={<ResetPassword />} />
                            <Route path=":username" element={<UserShow />} />
                            <Route path="/nodes" element={(<NodesIndex />)} />
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
                                </Route>

                            </Route>
                            <Route path="/invitations" element={<Invite />} />
                        </Routes>
                    </Box>

                </Box>
            </ThemeProvider>
        </AppContext.Provider>
    );
}
