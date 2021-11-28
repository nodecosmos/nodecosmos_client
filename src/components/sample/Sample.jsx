import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* mui */
import { Typography, Grid } from '@mui/material';

function Sample(props) {
  const { sampleProp } = props;

  return (
    <Grid item xs={12}>
      <Typography color="primary">
        Welcome
        {sampleProp}
      </Typography>
    </Grid>
  );
}

Sample.defaultProps = {
  sampleProp: null,
};

Sample.propTypes = {
  sampleProp: PropTypes.string,
};

function mapStateToProps(state) {
  return { sample: state.sample };
}

export default connect(mapStateToProps)(Sample);
