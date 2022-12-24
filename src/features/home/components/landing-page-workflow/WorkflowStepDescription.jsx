import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function WorkflowStepDescription() {
  const currentWorkflow = useSelector((state) => state.landingPageWorkflows.currentWorkflow);

  return (
    <Box
      sx={{
        boxShadow: {
          xs: '0px -3px 1px -4px rgb(0 0 0 / 20%), 0px -1px 5px -1px rgb(0 0 0 / 15%)',
          md: 'none',
        },
      }}
    >
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: {
            xs: '#202027',
            md: '#101013',
          },
          boxShadow: {
            xs: '0px 3px 1px -2px rgb(68 66 72 / 20%), 0px 1px 2px 0px rgb(68 66 72 / 20%)',
            md: '0px 3px 1px -2px rgb(66 70 72 / 50%), 0px 1px 2px 0px rgb(68 66 72 / 20%)',
          },
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
      <Box height={1} p={2}>
        <Typography color="text.secondary">
          {currentWorkflow?.description}
        </Typography>
      </Box>
    </Box>
  );
}
