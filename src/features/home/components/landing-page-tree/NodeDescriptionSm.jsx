import {
  Box, Card, CardContent, CardHeader, useMediaQuery, useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function NodeDescriptionSm() {
  const currentNodeID = useSelector((state) => state.app.currentNodeID);
  const currentNode = useSelector((state) => state.landingPageNodes[currentNodeID]);
  const descRef = React.useRef(null);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('md'));

  if (!matchesSm) return null;

  const title = currentNode ? currentNode.title : 'Select node to view description';

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
            title={title}
          />
          {/* #30343a */ }
          <CardContent ref={descRef} sx={{ color: '#99a4b2' }}>
            {currentNode?.description}
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
