/* eslint-disable react/self-closing-comp */
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function Vision() {
  // noinspection CheckTagEmptyBody
  return (
    <Grid
      container
      align="center"
      alignItems="center"
      sx={{
        marginTop: 5,
        padding: 6,
        backgroundColor: '#292c32',
        borderRadius: 8,
      }}
    >
      <Grid item xs={12}>
        <Box
          flexDirection="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2" color="secondary.main">Vision</Typography>
          <Typography variant="h6" pt={4}>
            Nodecosmos is Innovation Collaboration Platform which provides tools and support
            for scientist and engineers to collaborate on innovations and research.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
