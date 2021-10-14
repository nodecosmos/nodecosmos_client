import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const UserShowPage = (props) => {
  console.log(props);
  const { match: { params: { username } } } = props;
  // props.setSubtitle('Account');

  return (
    <Grid item xs={12}>
      <Typography variant="h1" color="primary">
        {username}
      </Typography>
    </Grid>
  );
};

UserShowPage.propTypes = {
  currentUser: PropTypes.shape({ username: PropTypes.string }).isRequired,
  match: PropTypes.object.isRequired,
  // setSubtitle: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { currentUser: state.auth.currentUser };
}

export default connect(mapStateToProps)(UserShowPage);
