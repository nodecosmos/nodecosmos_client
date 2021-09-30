import React from 'react';
import * as PropTypes from 'prop-types';
/* material ui */
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { login } from '../../actions';

class Index extends React.Component {
  componentDidMount = (formValues) => {
  }

  render() {
    return (
      <Typography color="primary" align="center">
        {this.props.currentUser.username}
      </Typography>
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
