import Box from '@mui/material/Box';
import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* mui */
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './header/Header';
/* users */
import UserAuthentication from './users/UserAuthentication';
import UserShowPage from './users/UserShowPage';
/* microns */
import MicronContainer from './microns/MicronIndex';
import MicronShow from './microns/MicronShow';
/* micro */
import history from '../history';
import dark from '../themes/dark/dark';
/* css */
import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

const themes = { dark };

function App({ theme, isAuthenticated, currentUser }) {
  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <Router history={history}>
        <Box
          borderRadius={2}
          p={0}
          height={1}
          width={1}
          overflow="hidden"
          className="BorderedBox BoxBackground"
        >
          <Route path="/login">
            {isAuthenticated
              ? <Redirect to={`/users/${currentUser.username}`} />
              : <UserAuthentication />}
          </Route>
          <Route path="/" component={Header} />
          <Route path="/users/:username" component={UserShowPage} />
          <Route exact path="/" component={MicronContainer} />
          <Route path="/microns/:id" component={MicronShow} />
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
  const { theme } = state.app;
  const { isAuthenticated, currentUser } = state.auth;
  return { theme, isAuthenticated, currentUser };
}

export default connect(mapStateToProps)(App);
