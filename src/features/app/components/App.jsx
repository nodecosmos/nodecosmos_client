import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
/* mui */
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Index from '../../../pages/landing/Index';
/* users */
import UserAuthentication from '../../../pages/users/Authentication';
import UserShowPage from '../../../pages/users/Show';
/* nodes */
import NodesIndex from '../../../pages/nodes/Index';
import NodeShow from '../../../pages/nodes/Show';
import useUserAuthentication from '../../authentication/services/useUserAuthentication';
/* nodecosmos */
import Header from './header/Header';
import history from '../../../history';
import getTheme from '../../../themes/theme';
import dark from '../../../themes/dark';
import light from '../../../themes/light';

/* css */
import './App.css';

const NON_HEADER_PATHS = ['/login', '/landing'];

export default function App() {
  const theme = useSelector((state) => state.app.theme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const themes = { light, dark };
  const currentTheme = themes[theme];

  const { syncUpCurrentUser } = useUserAuthentication();

  useEffect(() => {
    if (isAuthenticated) syncUpCurrentUser();
  }, [isAuthenticated, syncUpCurrentUser]);

  return (
    <ThemeProvider theme={getTheme(currentTheme)}>
      <CssBaseline />
      <Router history={history}>
        <Box
          borderRadius={2}
          p={0}
          height={1}
          width={1}
          overflow="hidden"
          className="MainContent"
        >
          <Route path="/login">
            {isAuthenticated
              ? <Redirect to={`/users/${currentUser.username}`} />
              : <UserAuthentication />}
          </Route>
          <Route path="/landing" component={Index} />
          <Route
            path="/"
            render={({ location }) => !NON_HEADER_PATHS.includes(location.pathname) && <Header />}
          />
          <Route path="/users/:username" component={UserShowPage} />
          <Route exact path="/" component={NodesIndex} />
          <Route path="/nodes/:id" component={NodeShow} />
        </Box>
      </Router>
    </ThemeProvider>
  );
}
