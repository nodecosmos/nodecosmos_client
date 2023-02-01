import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import MarkdownEditor from '../markdown/MarkdownEditor';
import NodeMarkdownPreview from '../markdown/MarkdownPreview';
import MarkdownToolbar from '../markdown/MarkdownToolbar';

export default function NodeDescription() {
  const currentNodeId = useSelector((state) => state.nodes.currentNodeId);
  const currentNodeTitle = useSelector((state) => state.nodes.byId[currentNodeId]?.title);
  const currentNodeDescription = useSelector((state) => state.nodes.byId[currentNodeId]?.description);
  const isEditingDescription = useSelector((state) => state.nodes.byId[currentNodeId]?.isEditingDescription);

  const blankDescription = (
    <Typography color="text.secondary" textAlign="center">
      {(currentNodeId && 'This node has no description yet.') || (
        <Box component="span" fontSize={30}>
          ¯\_(ツ)_/¯
        </Box>
      )}
    </Typography>
  );

  const nodeDescription = (
    <Box height={1} p={2}>
      {
        (
          currentNodeDescription
          && <Typography variant="body1" color="text.secondary">{currentNodeDescription}</Typography>
        ) || blankDescription
      }
    </Box>
  );

  const descriptionContent = isEditingDescription ? <MarkdownEditor id={currentNodeId} />
    : <NodeMarkdownPreview id={currentNodeId} />;

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
        <MarkdownToolbar id={currentNodeId} />
        <Typography textAlign="center" color="text.secondary">
          {currentNodeTitle || 'Select a node from the tree to view its description'}
        </Typography>
        <div />
      </Box>
      <Box height="calc(100% - 56px)" overflow="auto">
        {descriptionContent}
      </Box>
    </Box>
  );
}
