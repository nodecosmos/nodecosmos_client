import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
/* nodes */
import NodesIndex from '../../../pages/nodes/Index';
import NodeShow from '../../../pages/nodes/Show';
import TreeTab from '../../../pages/nodes/show/TreeTab';
import WorkflowTab from '../../../pages/nodes/show/WorkflowTab';
/* users */
import UserAuthentication from '../../../pages/users/Authentication';
import { selectCurrentUser, selectIsAuthenticated } from '../../authentication/authentication.selectors';
import { syncUpCurrentUser } from '../../authentication/authentication.thunks';
import { selectLikedObjectIds } from '../../likes/likes.selectors';
import { getLikedObjectIds } from '../../likes/likes.thunks';
import { HEADER_HEIGHT } from '../constants';
import LoginForm from '../../authentication/components/LoginForm';
import SignupForm from '../../authentication/components/SignupForm';
/* theme */
import dark from '../../../themes/dark';
import light from '../../../themes/light';
import getTheme from '../../../themes/theme';

import Alert from './Alert';
import Header from './header/Header';

export default function LazyAppLoad() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const likes = useSelector(selectLikedObjectIds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(syncUpCurrentUser());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && !likes) {
      dispatch(getLikedObjectIds());
    }
  }, [dispatch, isAuthenticated, likes]);

  const theme = useSelector((state) => state.app.theme);

  const themes = {
    light,
    dark,
  };
  const currentTheme = themes[theme];

  return (
    <ThemeProvider theme={getTheme(currentTheme)}>
      <CssBaseline />
      <Box
        height={1}
        width={1}
        p={{ xs: 0, sm: 1 }}
        backgroundColor="background.1"
      >
        <Box
          height={1}
          width={1}
          boxShadow="8"
          backgroundColor="background.2"
          borderRadius={{ xs: 0, sm: 2 }}
        >
          <Box
            borderRadius={{ xs: 0, sm: 2 }}
            height={1}
            overflow="hidden"
            border={1}
            borderColor="borders.2"
          >
            <Alert />
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
                  <Route path=":id" element={<TreeTab />} />
                  <Route path=":id/workflow" element={<WorkflowTab />} />
                  <Route path=":id/contribution_requests" element={<div />} />
                  <Route path=":id/tasks_board" element={<div />} />
                  <Route path=":id/media" element={<div />} />
                  <Route path=":id/insights" element={<div />} />
                  <Route path=":id/topics" element={<div />} />
                  <Route path=":id/settings" element={<div />} />

                  <Route path=":rootId/:id" element={<TreeTab />} />
                  <Route path=":rootId/:id/workflow" element={<WorkflowTab />} />
                  <Route path=":rootId/:id/contribution_requests" element={<div />} />
                  <Route path=":rootId/:id/tasks_board" element={<div />} />
                  <Route path=":rootId/:id/media" element={<div />} />
                  <Route path=":rootId/:id/insights" element={<div />} />
                  <Route path=":rootId/:id/topics" element={<div />} />
                  <Route path=":rootId/:id/settings" element={<div />} />
                </Route>
              </Routes>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
