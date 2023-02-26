import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
/* nodes */
import NodesIndex from '../../../pages/nodes/Index';
import NodeShow from '../../../pages/nodes/Show';
import TreeTab from '../../../pages/nodes/show/TreeTab';
import WorkflowTab from '../../../pages/nodes/show/WorkflowTab';
/* users */
import UserAuthentication from '../../../pages/users/Authentication';
import dark from '../../../themes/dark';
import light from '../../../themes/light';
import getTheme from '../../../themes/theme';
import { selectCurrentUser, selectIsAuthenticated } from '../../authentication/authentication.selectors';
import { syncUpCurrentUser } from '../../authentication/authentication.thunks';
/* nodecosmos */
import { HEADER_HEIGHT } from '../constants';
import Alert from './Alert';
import Header from './header/Header';
import AppSx from './AppSx';

export default function LazyAppLoad() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) dispatch(syncUpCurrentUser());
  }, [dispatch, isAuthenticated]);

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
        p={{ xs: 0, sm: 0.75 }}
        backgroundColor="background.1"
        sx={AppSx}
      >
        <Box
          height={1}
          width={1}
          boxShadow="8"
          backgroundColor="background.2"
          border={1}
          borderColor="borders.2"
          borderRadius={{ xs: 0, sm: 2 }}
        >
          <Box
            borderRadius={{ xs: 0, sm: 2 }}
            height={1}
            overflow="auto"
            border={1}
            borderColor="borders.2"
          >
            <Alert />
            <Header />
            <Box height={1} pt={`${HEADER_HEIGHT}px`}>
              <Routes>
                <Route path="/n" element={(<NodesIndex />)} />
                <Route
                  path="/login"
                  element={isAuthenticated
                    ? <Navigate to={`/users/${currentUser.username}`} /> : <UserAuthentication />}
                />
                <Route path="/nodes" element={<NodeShow />}>
                  <Route path=":id" element={<TreeTab />} />
                  <Route path=":id/workflow" element={<WorkflowTab />} />
                  <Route path=":id/contribution_requests" element={<div> contribution_requests </div>} />
                  <Route path=":id/media" element={<div> media </div>} />
                  <Route path=":id/insights" element={<div> insights </div>} />
                  <Route path=":id/topics" element={<div> topics </div>} />
                  <Route path=":id/settings" element={<div> settings </div>} />
                </Route>
              </Routes>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
