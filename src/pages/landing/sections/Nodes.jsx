/* eslint-disable react/self-closing-comp */

import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import LandingNodeSidebar from './nodes-section/LandingNodeSidebar';

export default function Vision() {
  const [tab, setTab] = useState(0);
  const handleTabChange = (_, currentTab) => setTab(currentTab);

  return (
    <Grid
      container
      align="center"
      alignItems="center"
      id="vision"
      sx={{
        marginTop: 6,
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%),'
                 + '0px 1px 1px 0px rgb(0 0 0 / 14%),'
                 + '0px 1px 3px 0px rgb(0 0 0 / 12%)',
        borderRadius: 8,
        padding: 4,
        backgroundColor: '#32353b',
      }}
    >
      <Grid item xs={12}>
        <Box
          flexDirection="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" color="primary.main">Nodes</Typography>
          <Typography variant="h6" align="left" mt={4}>
            Nodes are used to represent unit of innovation or research and its constituents (components).
            They are used to build
            Node Tree which represents complete project. Here is sample of lightbulb:
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={3} mt={4}>
        <LandingNodeSidebar />
      </Grid>
    </Grid>
  );
}
