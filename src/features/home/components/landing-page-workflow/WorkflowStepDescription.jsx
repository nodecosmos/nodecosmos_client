import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useSelector } from 'react-redux';

export default function WorkflowStepDescription() {
  const currentWorkflow = useSelector((state) => state.landingPageWorkflows.currentWorkflow);

  return (
    <Card
      elevation={0}
      sx={{
        mt: '2px',
        p: 0,
        border: 'none',
        borderRadius: 0,
        width: '100%',
        height: 'calc(100% - 2px)',
        color: '#9a9a9e',
      }}
    >
      <CardHeader
        sx={{
          borderBottom: '1px solid',
          borderTop: {
            xs: '1px solid ',
            md: 'none',
          },
          boxShadow: {
            xs: '0px 3px 1px -2px rgb(68 66 72 / 20%), 0px 1px 2px 0px rgb(68 66 72 / 20%)',
            md: '0px 3px 1px -2px rgb(66 70 72 / 50%), 0px 1px 2px 0px rgb(68 66 72 / 20%)',
          },
          borderColor: {
            xs: '#202027',
            md: '#101013',
          },
        }}
        titleTypographyProps={{
          fontSize: {
            xs: 14,
            sm: 18,
          },
          textAlign: 'center',
        }}
        title={currentWorkflow?.title || 'Select a step to see details'}
      />
      <CardContent sx={{
        border: 'none',
        fontSize: {
          xs: 14,
          sm: 18,
        },
      }}
      >
        {currentWorkflow?.description}
      </CardContent>
    </Card>
  );
}
