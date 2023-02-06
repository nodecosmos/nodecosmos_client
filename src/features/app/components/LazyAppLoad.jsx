import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
/* nodes */
import NodesIndex from '../../../pages/nodes/Index';
import NodeShow from '../../../pages/nodes/Show';
import TreeTab from '../../../pages/nodes/show/TreeTab';
/* users */
import UserAuthentication from '../../../pages/users/Authentication';
import dark from '../../../themes/dark';
import light from '../../../themes/light';
import getTheme from '../../../themes/theme';
import useUserAuthentication from '../../authentication/hooks/useUserAuthentication';
/* nodecosmos */
import { HEADER_HEIGHT } from '../constants';
import Header from './header/Header';
import AppSx from './AppSx';

export default function LazyAppLoad() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const { syncUpCurrentUser } = useUserAuthentication();

  useEffect(() => {
    if (isAuthenticated) syncUpCurrentUser();
  }, [isAuthenticated, syncUpCurrentUser]);

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
                  <Route path=":id/workflow" element={<div> workflow </div>} />
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
