/* eslint-disable react/self-closing-comp */
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function Vision() {
  // noinspection CheckTagEmptyBody
  return (
    <Grid container align="center" alignItems="center" id="vision">
      <Grid item xs={6} p={3}>
        <Box
          flexDirection="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" color="#845fa9">Current Progress</Typography>
        </Box>
      </Grid>
      <Grid item xs={6} p={3} align="right">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <lottie-player
              src="https://assets4.lottiefiles.com/packages/lf20_jbgwu6aw.json"
              autoplay
              loop
            >
            </lottie-player>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}
