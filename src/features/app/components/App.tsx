import Header from './header/Header';
import ContributionRequestIndex from '../../../pages/contribution-requests/Index';
import ContributionRequestShow from '../../../pages/contribution-requests/Show';
import ContributionRequestTree from '../../../pages/contribution-requests/tabs/ContributionRequestTree';
import ContributionRequestWorkflow from '../../../pages/contribution-requests/tabs/ContributionRequestWorkflow';
import NodesIndex from '../../../pages/nodes/Index';
import NodeShow from '../../../pages/nodes/Show';
import TreeShow from '../../../pages/trees/Show';
import UserAuthentication from '../../../pages/users/Authentication';
import WorkflowShow from '../../../pages/workflows/Show';
import { NodecosmosDispatch } from '../../../store';
import getTheme, { themes } from '../../../themes/theme';
import { selectCurrentUser, selectIsAuthenticated } from '../../authentication/authentication.selectors';
import { syncUpCurrentUser } from '../../authentication/authentication.thunks';
import LoginForm from '../../authentication/components/LoginForm';
import SignupForm from '../../authentication/components/SignupForm';
import { selectLikesByBranchId } from '../../likes/likes.selectors';
import { getUserLikes } from '../../likes/likes.thunks';
import { selectTheme } from '../app.selectors';
import { HEADER_HEIGHT, SYNC_UP_INTERVAL } from '../constants';
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
    const likes = useSelector(selectLikesByBranchId);
    const theme = useSelector(selectTheme);
    const currentTheme = themes[theme];

    useEffect(() => {
        if (!isAuthenticated) return;
        if (Date.now() - currentUser.lastSyncUpAt < SYNC_UP_INTERVAL) return;

        dispatch(syncUpCurrentUser()).then((response) => {
            if (response.payload?.success) {
                dispatch(getUserLikes());
            }
        });
    }, [currentUser?.lastSyncUpAt, dispatch, isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated && Object.keys(likes).length === 0) {
            dispatch(getUserLikes());
        }
    }, [dispatch, isAuthenticated, likes]);

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
                                ? <Navigate to={`/users/${currentUser.username}`} /> : <UserAuthentication />}
                        >
                            <Route path="login" element={<LoginForm />} />
                            <Route path="signup" element={<SignupForm />} />
                        </Route>
                        <Route path="/nodes" element={<NodeShow />}>
                            <Route path=":id" element={<TreeShow />} />
                            <Route path=":id/workflow" element={<WorkflowShow />} />
                            {/* Contribution Requests */}
                            <Route path=":id/contribution_requests" element={<ContributionRequestIndex />} />
                            <Route path=":id/contribution_requests">
                                <Route path=":contributionRequestId" element={<ContributionRequestShow />}>
                                    <Route path="" element={<div />} />
                                    <Route path="tree" element={<ContributionRequestTree />} />
                                    <Route path="workflow" element={<ContributionRequestWorkflow />} />
                                    <Route path="commits" element={<div />} />
                                </Route>
                            </Route>
                            <Route path=":id/topics" element={<div />} />
                            <Route path=":id/tasks_board" element={<div />} />
                            <Route path=":id/settings" element={<div />} />
                        </Route>
                    </Routes>
                </Box>

            </Box>
        </ThemeProvider>
    );
}
