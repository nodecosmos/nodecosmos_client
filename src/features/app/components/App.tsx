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
import NodesIndex from '../../../pages/nodes/Index';
import NodeShow from '../../../pages/nodes/Show';
import TreeShow from '../../../pages/trees/Show';
import UserAuthentication from '../../../pages/users/Authentication';
import UserShow from '../../../pages/users/Show';
import WorkflowShow from '../../../pages/workflows/Show';
import { NodecosmosDispatch } from '../../../store';
import getTheme, { themes } from '../../../themes/theme';
import LoginForm from '../../users/components/LoginForm';
import SignupForm from '../../users/components/SignupForm';
import { selectCurrentUser, selectIsAuthenticated } from '../../users/users.selectors';
import { syncUpCurrentUser } from '../../users/users.thunks';
import { selectTheme } from '../app.selectors';
import { HEADER_HEIGHT } from '../constants';
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

    return (
        <ThemeProvider theme={getTheme(currentTheme)}>
            <CssBaseline />
            <Box component="div" height={1} sx={{ backgroundColor: 'background.2' }}>
                <Header />
                <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
                    <Routes>
                        <Route path="/nodes" element={(<NodesIndex />)} />
                        <Route
                            path="/auth"
                            element={isAuthenticated
                                ? <Navigate to={`/${currentUser?.username}`} /> : <UserAuthentication />}
                        >
                            <Route path="login" element={<LoginForm />} />
                            <Route path="signup" element={<SignupForm />} />
                        </Route>
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

                                {/*Topics*/}
                                <Route path="topics" element={<div />} />

                                {/*Tasks*/}
                                <Route path="tasks_board" element={<div />} />

                                {/*Settings*/}
                                <Route path="settings" element={<div />} />
                            </Route>

                        </Route>
                        <Route path="404" element={<NotFound />} />
                        <Route path=":username" element={<UserShow />} />
                    </Routes>
                </Box>

            </Box>
        </ThemeProvider>
    );
}
