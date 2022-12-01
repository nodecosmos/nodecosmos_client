import {
  Box, Card, CardContent, CardHeader,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function NodeDescription() {
  const currentNodeID = useSelector((state) => state.app.currentNodeID);
  const currentNode = useSelector((state) => state.nodes[currentNodeID]);

  if (!currentNode) return null;

  return (
    <g>
      <Box
        component="foreignObject"
        sx={{
          width: 500,
          height: '100%',
          x: 520,
          y: 0,
          p: 2,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Card
            elevation={0}
            sx={{
              p: 0,
              background: '#353941',
              border: '1px solid #3c434f',
              width: 482,
            }}
          >
            <CardHeader
              sx={{ borderBottom: '1px solid #3c434f', height: 50 }}
              titleTypographyProps={{
                variant: 'body1',
                textAlign: 'center',
              }}
              title={currentNode.title}
            />
            <CardContent sx={{ minHeight: 208, background: '#30343a' }}>
              {currentNode.description}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </g>
  );
}
