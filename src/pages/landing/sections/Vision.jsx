/* eslint-disable react/self-closing-comp */
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
        padding: 4,
        backgroundColor: '#2f3438',
        borderRadius: 8,
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 50%),'
          + ' 1px 0px 2px -1px rgb(0 0 0 / 50%),'
          + ' -1px -1px 2px -1px rgb(0 0 0 / 25%)',
      }}
    >
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Typography variant="h2" color="secondary.main">Vision</Typography>
            <Typography variant="h6" pt={4}>
              Nodecosmos is Innovation Collaboration Platform which provides tools and support
              for scientist and engineers to collaborate on innovations and research.
            </Typography>
          </Box>

          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            width="100%"
            height="auto"
            autoPlay
            muted
            loop
            style={{
              float: 'right', overflow: 'hidden', border: 0, marginBottom: -1,
            }}
          >
            <source src="earth8.mp4" type="video/mp4" />
          </video>
        </Box>
      </Grid>
    </Grid>
  );
}
