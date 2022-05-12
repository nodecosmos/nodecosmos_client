import TagRounded from '@mui/icons-material/TagRounded';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* mui */
import {
  Tab,
  Tabs,
  Box,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
/* micro */
import { login } from '../../actions';
import nodecosmos from '../../apis/nodecosmos-server';
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
      const response = await nodecosmos.post('/users/sign_in', formValues);
      this.handleSignIn(response);
    } catch ({ response }) {
      console.error(response);

      if (response.data) return response.data.error; // maps error object to final-form submitError
    }
  }

  // eslint-disable-next-line consistent-return
  createUser = async (formValues) => {
    try {
      const response = await nodecosmos.post('/users', { user: formValues });
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

    this.props.login({ user, token });

    history.push('/');
  };

  handleTabChange = (_, currentPage) => {
    this.setState({ currentPage });
  }

  render() {
    const { currentPage } = this.state;

    return (
      <Container
        maxWidth="sm"
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ height: 600, width: 1 }}>
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TagRounded sx={{ color: 'primary.light', fontSize: 35 }} />
            <Box fontSize={35} align="center">
              <Box component="span" color="primary.light"> micro</Box>
              <Box component="span" color="secondary.main">cosmos</Box>
            </Box>
          </Box>
          <Box>
            <Tabs value={currentPage} onChange={this.handleTabChange} centered>
              <Tab label="Log in" disableRipple />
              <Tab label="Sign up" disableRipple />
            </Tabs>
          </Box>
          <Box textAlign="center" mt={3}>
            {currentPage === 0 ? <LoginForm onSubmit={this.loginUser} /> : <SignupForm onSubmit={this.createUser} />}
          </Box>
        </Box>
      </Container>
    );
  }
}

UserAuthentication.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(UserAuthentication);
