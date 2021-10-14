import React from 'react';
import * as PropTypes from 'prop-types';
/* material ui */
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { login } from '../../actions';

class Index extends React.Component {
  componentDidMount = (formValues) => {
    // eslint-disable-next-line no-debugger
  }

  render() {
    return (
      <Grid item xs={12} align="center">
        <Typography color="primary" align="center">
          {this.props.currentUser.username}
        </Typography>
      </Grid>
    );
  }
}

Index.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { currentUser } = state.auth;
  return { currentUser };
}

export default connect(mapStateToProps, { login })(Index);
