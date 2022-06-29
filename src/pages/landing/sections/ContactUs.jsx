/* eslint-disable react/self-closing-comp */
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function Vision() {
  // noinspection CheckTagEmptyBody
  return (
    <Grid container align="center" alignItems="center" id="vision" sx={{ paddingTop: 6 }}>
      <Grid item xs={12}>
        <Box
          flexDirection="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" color="#845fa9">Contact Us</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
