import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectSelectedNode, selectSelectedNodeId } from '../../nodes.selectors';

export default function NodeDescription() {
  const selectedNodeId = useSelector(selectSelectedNodeId);

  const { title, description } = useSelector(selectSelectedNode);

  const blankDescription = (
    <Typography color="text.secondary" textAlign="center">
      { (selectedNodeId && 'This node has no description yet.') || <Box component="span" fontSize={30}>¯\_(ツ)_/¯</Box> }
    </Typography>
  );

  return (
    <Box
      height={1}
      p={3}
      sx={{
        color: 'text.secondary',
        'h1, h2, h3, h4, h5, h6': {
          marginBlockStart: 0,
          marginBlockEnd: 3,
        },
        hr: {
          border: 0,
          borderBottom: 1,
          borderColor: 'borders.2',
        },
        blockquote: {
          m: 0,
          backgroundColor: 'markdownContent.canvas',
          borderRadius: 1,
          borderLeft: 6,
          p: 1,
          pl: 2,
          borderColor: 'markdownContent.border',
        },
        table: {
          tr: {
            borderRadius: 1,
            'td, th': {
              mt: 1,
              borderBottom: 1,
              borderRight: 1,
              borderColor: 'borders.2',
              p: '12px 16px',
            },
            'td:last-of-type': { borderRight: 0 },
            'th:last-of-type': { borderRight: 0 },
            '&:last-of-type td': { borderBottom: 0 },
            '&:hover': {
              backgroundColor: 'background.hover',
            },
          },
        },
        pre: {
          ml: 0,
          p: 2,
          borderRadius: 1,
          backgroundColor: 'markdownContent.canvas',
        },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </Typography>
      {(description && <Box pb={2} dangerouslySetInnerHTML={{ __html: description }} />) || blankDescription}
    </Box>
  );
}
