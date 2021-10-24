import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* material-ui */
import {
  Grid, Tab, Tabs,
} from '@mui/material';
/* micro lib */
import { login } from '../../actions';
import microcosmos, { setAuthorizationToken } from '../../apis/microcosmos-server';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import history from '../../history';

class UserAuthentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
  }

  // eslint-disable-next-line consistent-return
  loginUser = async (formValues) => {
    try {
      const response = await microcosmos.post('/users/sign_in', formValues);
      this.handleSignIn(response);
    } catch ({ response }) {
      console.error(response);

      if (response.data) return response.data.error; // maps error object to final-form submitError
    }
  }

  // eslint-disable-next-line consistent-return
  createUser = async (formValues) => {
    try {
      const response = await microcosmos.post('/users', { user: formValues });
      this.handleSignIn(response);
    } catch (response) {
      console.error(response);

      if (response.data) return response.data.error; // maps error object to final-form submitError
    }
  }

  handleSignIn = (response) => {
    const { user, token } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));

    setAuthorizationToken();
    this.props.login({ user, token });

    history.push('/');
  };

  handleTabChange = (_, currentPage) => {
    this.setState({ currentPage });
  }

  render() {
    const { currentPage } = this.state;

    return (
      <Box mt={5}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" align="center" fontWeight="normal">
              <Box component="span" color="primary.main"> #micro</Box>
              <Box component="span" color="secondary.main">cosmos</Box>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Tabs value={currentPage} onChange={this.handleTabChange} centered>
              <Tab label="Log in" disableRipple />
              <Tab label="Sign up" disableRipple />
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={10} md={6} lg={4} align="center">
            {currentPage === 0 ? <LoginForm onSubmit={this.loginUser} /> : <SignupForm onSubmit={this.createUser} />}
          </Grid>
        </Grid>
      </Box>
    );
  }
}

UserAuthentication.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(UserAuthentication);
