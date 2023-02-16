import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectSelectedNode, selectSelectedNodeId } from '../nodes.selectors';
import MarkdownEditor from './markdown/MarkdownEditor';
import MarkdownToolbar from './markdown/MarkdownToolbar';

export default function NodeDescription() {
  const selectedNodeId = useSelector(selectSelectedNodeId);

  const { title, description, isEditingDescription } = useSelector(selectSelectedNode);

  const blankDescription = (
    <Typography color="text.secondary" textAlign="center">
      { selectedNodeId && 'This node has no description yet.' || <Box component="span" fontSize={30}>¯\_(ツ)_/¯</Box> }
    </Typography>
  );

  const nodeDescription = (
    <Box height={1} p={3}>
      {(description && <Box dangerouslySetInnerHTML={{ __html: description }} />) || blankDescription}
    </Box>
  );

  return (
    <Box height={1}>
      <Box
        borderBottom={1}
        borderColor={{
          xs: 'borders.box.xs',
          md: 'borders.box.md',
        }}
        boxShadow={{
          xs: 'boxBorder.bottom.xs',
          md: 'boxBorder.bottom.md',
        }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height={56}
        px={2}
        sx={{ overflow: 'hidden', overflowWrap: 'break-word' }}
      >
        <MarkdownToolbar id={selectedNodeId} />
        <Typography textAlign="center" color="text.secondary">
          {title || 'Select a node from the tree to view its description'}
        </Typography>
        <div />
      </Box>
      <Box height="calc(100% - 56px)" overflow="auto">
        {isEditingDescription ? <MarkdownEditor id={selectedNodeId} /> : nodeDescription}
      </Box>
    </Box>
  );
}
