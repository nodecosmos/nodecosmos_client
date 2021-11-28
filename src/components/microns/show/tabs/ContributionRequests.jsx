import Typography from '@mui/material/Typography';
import React from 'react';
import PropTypes from 'prop-types';
/* mui */
import {
  Grid,
} from '@mui/material';

export default function MicronTab(props) {
  const { micron } = props;

  return (
    <Grid container spacing={3} mt={1} justifyContent="center">
      <Grid item xs={12} align="center" justifyItems="center">
        <Typography variant="h5">
          {micron.title}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="body2" fontWeight="normal">
          {micron.description}
        </Typography>
      </Grid>
    </Grid>
  );
}

MicronTab.propTypes = {
  micron: PropTypes.object.isRequired,
};
