import React from 'react';
import {
  Card, CardContent, CardHeader, Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

export default function NodeDescription() {
  const currentNodeID = useSelector((state) => state.app.currentNodeID);
  const currentNode = useSelector((state) => state.landingPageNodes[currentNodeID]);

  const blankDescription = (
    <Box textAlign="center">
      {(currentNode && 'This node has no description yet.') || (
        <Box fontSize={30}>
          ¯\_(ツ)_/¯
        </Box>
      )}
    </Box>
  );

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
        color: '#a4a7ab',
        boxShadow: {
          xs: '0px -3px 1px -4px rgb(0 0 0 / 20%), 0px -1px 5px -1px rgb(0 0 0 / 15%)',
          md: 'none',
        },
      }}
    >
      <CardHeader
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
          borderTop: {
            xs: 'none',
            md: 'none',
          },
        }}
        titleTypographyProps={{
          fontSize: {
            xs: 14,
            sm: 18,
          },
          textAlign: 'center',
          letterSpacing: '0.009em',
          color: '#a4a7ab',
        }}
        title={
        (!!currentNode && (currentNode?.title || 'No Title')) || 'Select a node from the tree to view its description'
      }
      />
      <CardContent sx={{
        border: 'none',
        height: 1,
      }}
      >
        {
          (
            currentNode
            && currentNode.description
            && (<Typography variant="body1" color="#a4a7ab">{currentNode.description}</Typography>)
          ) || blankDescription
        }
      </CardContent>
    </Card>
  );
}
