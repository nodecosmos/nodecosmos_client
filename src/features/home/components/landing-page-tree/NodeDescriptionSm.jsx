import React from 'react';
import {
  Card, CardContent, CardHeader, useMediaQuery, useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';

export default function NodeDescriptionSm() {
  const currentNodeID = useSelector((state) => state.app.currentNodeID);
  const currentNode = useSelector((state) => state.landingPageNodes[currentNodeID]);
  const descRef = React.useRef(null);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('lg'));

  if (!matchesSm) return null;

  const title = currentNode ? currentNode.title : 'Select node to view description';

  return (
    <Card
      elevation={0}
      sx={{
        p: 0,
        background: 'transparent',
        width: '100%',
        borderRadius: '0 0 8px 8px',
        border: '1px solid #5a6577',
        position: 'relative',
        boxShadow: '0 -1px 5px 0 #292c32',
        borderTopColor: '#41464e',
      }}
    >
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
      <CardContent
        ref={descRef}
        sx={{
          color: '#99a4b2',
        }}
      >
        {currentNode?.description}
      </CardContent>
    </Card>
  );
}
