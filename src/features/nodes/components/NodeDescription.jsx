import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import MarkdownEditor from './markdown/MarkdownEditor';
import MarkdownToolbar from './markdown/MarkdownToolbar';

export default function NodeDescription() {
  const selectedNodeId = useSelector((state) => state.nodes.selectedNodeId);
  const currentNodeTitle = useSelector((state) => state.nodes.byId[selectedNodeId]?.title);
  const currentNodeDescription = useSelector((state) => state.nodes.byId[selectedNodeId]?.description);
  const isEditingDescription = useSelector((state) => state.nodes.byId[selectedNodeId]?.isEditingDescription);

  const blankDescription = (
    <Typography color="text.secondary" textAlign="center">
      {(selectedNodeId && 'This node has no description yet.') || (
        <Box component="span" fontSize={30}>
          ¯\_(ツ)_/¯
        </Box>
      )}
    </Typography>
  );

  const nodeDescription = (
    <Box height={1} p={3}>
      {
        (
          currentNodeDescription
          && (
          <Box
            dangerouslySetInnerHTML={{
              __html: currentNodeDescription,
            }}
          />
          )
        ) || blankDescription
      }
    </Box>
  );

  const descriptionContent = isEditingDescription ? <MarkdownEditor id={selectedNodeId} /> : nodeDescription;

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
