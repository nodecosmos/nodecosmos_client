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
      id="vision"
      sx={{ paddingTop: 6 }}
    >
      <Grid
        item
        xs={12}
        p={3}
        sx={{
          padding: 6,
          backgroundColor: '#292c32',
          borderRadius: 16,
        }}
      >
        <Box
          flexDirection="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" color="primary.main">Investments & NFT</Typography>
          <Typography variant="h6" mt={4}>
            Once innovation is created we need funding to get it to the world. Guess what?
            Nodecosmos plans to cover that. We plan to provide interface where you can issue
            {' '}
            <b>virtual shares</b>
            {' '}
            as NFTs.
            Those shares can be sold & traded on the platform. Although Nodecosmos will provide software solutions,
            innovator is responsible for incentivisation.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
