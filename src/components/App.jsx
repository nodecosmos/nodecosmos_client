import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* material */
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
/* micro lib */
import history from '../history';
import dark from '../themes/dark';
import Header from './header/Header';
/* users */
import UserAuthentication from './users/UserAuthentication';
import UserShowPage from './users/UserShowPage';
/* microns */
import MicronIndex from './microns/Index';

const themes = { dark };

function App({ theme, isAuthenticated, currentUser }) {
  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <Router history={history}>
        <Grid container style={{ padding: 8 }} spacing={1} justify="center">
          <Header />
          <Grid item xs={12}>
            <Paper className="BorderBottomRounded-6" style={{ height: 'calc(100vh - 80px)' }}>
              <Route path="/login">
                {isAuthenticated
                  // eslint-disable-next-line no-underscore-dangle
                  ? <Redirect to={`/users/${currentUser.username}`} />
                  : <UserAuthentication />}
              </Route>
              <Route path="/users/:username" component={UserShowPage} />
              <Route exact path="/" component={MicronIndex} />
              <Route exact path="/microns/new" component={MicronIndex} />
            </Paper>
          </Grid>
        </Grid>
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
