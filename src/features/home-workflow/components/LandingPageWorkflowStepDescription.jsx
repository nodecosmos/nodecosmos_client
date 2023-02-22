import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function LandingPageWorkflowStepDescription() {
  const currentWorkflow = useSelector((state) => state.landingPageWorkflows.currentWorkflow);

  return (
    <Box
      boxShadow={{
        xs: 'container.top.xs',
        md: 'none',
      }}
    >
      <Box
        borderBottom={1}
        borderColor={{
          xs: 'borders.box.xs',
          md: 'borders.box.md',
        }}
        boxShadow={{
          xs: 'container.bottom.xs',
          md: 'container.bottom.md',
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={56}
      >
        <Typography textAlign="center" color="text.secondary">
          {currentWorkflow?.title || 'Select a step to see details'}
        </Typography>
      </Box>
      <Box height={1} p={3}>
        <Typography color="text.secondary">
          {currentWorkflow?.description}
        </Typography>
      </Box>
    </Box>
  );
}
