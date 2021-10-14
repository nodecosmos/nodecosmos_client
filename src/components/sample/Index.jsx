import React from 'react';
import * as PropTypes from 'prop-types';

/* material ui */
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Index(props) {
  // const { } = props;

  return (
    <Grid item xs={12}>
      <Typography color="primary">Welcome</Typography>
    </Grid>
  );
}

Index.propTypes = {};
