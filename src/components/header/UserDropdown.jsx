import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '../microcosmos/MicroAvatar';

function UserDropdown(props) {
  const { currentUser, isAuthenticated } = props;

  if (isAuthenticated) {
    const letter = currentUser.username.charAt(0).toUpperCase();

    return (
      <Link to={`/user/${currentUser.username}`}>
        <Avatar letter={letter} />
      </Link>
    );
  }

  return (
    <Button component={Link} to="/login" color="primary" className="MicroButton">
      <Typography variant="body1" color="primary">
        login
      </Typography>
    </Button>
  );
}

UserDropdown.propTypes = {
  currentUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { currentUser, isAuthenticated } = state.auth;
  return { currentUser, isAuthenticated };
}

export default connect(mapStateToProps)(UserDropdown);
