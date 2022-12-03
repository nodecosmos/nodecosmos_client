import React from 'react';
import {
  Box, Card, CardContent, CardHeader, useMediaQuery, useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';

export default function WorkflowStepDescriptionSm() {
  const currentWorkflow = useSelector((state) => state.landingPageWorkflows.currentWorkflow);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('md'));

  if (!matchesSm) return null;

  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <Card
        elevation={0}
        sx={{
          p: 0,
          background: 'transparent',
          width: '100%',
          borderRadius: '8px 8px 0 0',
          border: '1px solid #5a6577',
          borderBottom: 'none',
        }}
      >
        <Box>
          <CardHeader
            sx={{
              borderBottom: '1px solid #3c434f',
              height: 35,
              background: '#353941',
            }}
            titleTypographyProps={{
              variant: 'body1',
              textAlign: 'center',
            }}
            title={currentWorkflow.title}
          />
          {/* #30343a */ }
          <CardContent sx={{ color: '#99a4b2' }}>
            {currentWorkflow.description}
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
