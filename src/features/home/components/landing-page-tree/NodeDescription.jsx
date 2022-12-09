import React from 'react';
import {
  Card, CardContent, CardHeader,
} from '@mui/material';
import { useSelector } from 'react-redux';

export default function NodeDescription() {
  const currentNodeID = useSelector((state) => state.app.currentNodeID);
  const currentNode = useSelector((state) => state.landingPageNodes[currentNodeID]);

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
        color: '#8b949e',
      }}
    >
      <CardHeader
        sx={{
          borderBottom: '1px solid #202027',
          boxShadow: {
            xs: '0px 3px 1px -2px rgb(68 66 72 / 20%), 0px 1px 2px 0px rgb(68 66 72 / 20%)',
            md: '0px 3px 1px -2px rgb(66 70 72 / 50%), 0px 1px 2px 0px rgb(68 66 72 / 20%)',
          },
        }}
        titleTypographyProps={{
          fontSize: {
            xs: 14,
            sm: 18,
          },
          textAlign: 'center',
        }}
        title={currentNode?.title || 'Select a node to see its details'}
      />
      <CardContent sx={{
        border: 'none',
        fontSize: {
          xs: 14,
          sm: 18,
        },
      }}
      >
        {currentNode?.description}
      </CardContent>
    </Card>
  );
}
