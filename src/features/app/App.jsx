import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
/* mui */
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../header/Header';
import Index from '../../pages/landing/Index';
/* users */
import UserAuthentication from '../../pages/users/Authentication';
import UserShowPage from '../../pages/users/Show';
/* nodes */
import NodesIndex from '../../pages/nodes/Index';
import NodeShow from '../../pages/nodes/Show';
/* nodecosmos */
import { syncCurrentUser } from '../../actions';
import history from '../../history';
import getTheme from '../../themes/theme';
import dark from '../../themes/dark';
import light from '../../themes/light';

/* css */
import './App.css';

const NON_HEADER_PATHS = ['/login', '/landing'];

function App({
  isAuthenticated, currentUser, theme,
}) {
  const dispatch = useDispatch();
  const themes = { light, dark };
  const currentTheme = themes[theme];

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(syncCurrentUser(currentUser.id));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { isAuthenticated, currentUser } = state.auth;
  const { theme } = state.app;
  return { isAuthenticated, currentUser, theme };
}

export default connect(mapStateToProps)(App);
