import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MicroAvatar from '../microcosmos/MicroAvatar';

function UserDropdown(props) {
  const { currentUser, isAuthenticated } = props;

  if (isAuthenticated) {
    return (
      <Link to={`/user/${currentUser.username}`}>
        <MicroAvatar user={currentUser} />
      </Link>
    );
  }

  return (
    <Button component={Link} to="/login" color="primary" className="MicroButton">
      <Typography variant="body1">
        Log In
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
