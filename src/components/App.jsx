import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* material */
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
/* micro lib */
import history from '../history';
import dark from '../themes/dark';
import Header from './header/Header';
/* users */
import UserAuthentication from './users/UserAuthentication';
import UserShowPage from './users/UserShowPage';
/* microns */
import MicronContainer from './microns/Container';
import MicronsNew from './microns/New';

import './App.css';

const themes = { dark };

function App({ theme, isAuthenticated, currentUser }) {
  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <Router history={history}>
        <Box sx={{ padding: 2, height: '100%' }}>
          <Paper style={{ height: '100%' }}>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12}>
                <Header />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ padding: 2 }}>
                  <Route path="/login">
                    {isAuthenticated
                      // eslint-disable-next-line no-underscore-dangle
                      ? <Redirect to={`/users/${currentUser.username}`} />
                      : <UserAuthentication />}
                  </Route>
                  <Route path="/users/:username" component={UserShowPage} />
                  <Route exact path="/" component={MicronContainer} />
                  <Route exact path="/microns/new" component={MicronsNew} />
                </Box>
              </Grid>
            </Grid>
          </Paper>
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
