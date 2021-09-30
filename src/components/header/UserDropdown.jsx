import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function UserDropdown(props) {
  const { currentUser, isAuthenticated } = props;

  if (isAuthenticated) {
    return (
      <Button component={Link} to={`/user/${currentUser.username}`} color="primary" className="MicroButton">
        <Typography variant="body1" color="primary">
          {currentUser.username}
        </Typography>
      </Button>
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
