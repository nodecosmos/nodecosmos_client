import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../../../app/constants';
import { selectFlowPaneContent } from '../../flows.selectors';
import FlowPaneDescription from './content/FlowPaneDescription';
import FlowPaneMarkdownEditor from './content/FlowPaneMarkdownEditor';
import FlowPaneToolbar from './FlowPaneToolbar';

export default function FlowPane() {
  const ioPaneContent = useSelector(selectFlowPaneContent);

  const contents = {
    markdown: <FlowPaneMarkdownEditor />,
    description: <FlowPaneDescription />,
  };

  const content = contents[ioPaneContent];

  return (
    <Box
      width={1}
      height={1}
      backgroundColor="background.6"
      sx={{
        overflow: 'hidden',
        'h1, h2, h3, h4, h5, h6': {
          marginBlockStart: 0,
          marginBlockEnd: 2,
        },
      }}
      position="relative"
      zIndex={1}
    >
      <FlowPaneToolbar />
      <Box height={`calc(100% - ${HEADER_HEIGHT})`} overflow="auto" pt={0.25}>
        {content}
      </Box>
    </Box>
  );
}
