import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../../../app/constants';
import { selectIOPaneContent } from '../../inputOutputs.selectors';
import IOPaneDescription from './content/IOPaneDescription';
import IOPaneMarkdownEditor from './content/IOPaneMarkdownEditor';
import IOPaneToolbar from './IOPaneToolbar';

export default function IOPane() {
  const ioPaneContent = useSelector(selectIOPaneContent);

  const contents = {
    markdown: <IOPaneMarkdownEditor />,
    description: <IOPaneDescription />,
  };

  const content = contents[ioPaneContent];

  return (
    <Box
      width={1}
      height={1}
      backgroundColor="background.5"
      sx={{ overflow: 'hidden' }}
      position="relative"
      zIndex={1}
    >
      <IOPaneToolbar />
      <Box height={`calc(100% - ${HEADER_HEIGHT})`} overflow="auto" pt={0.25}>
        {content}
      </Box>
    </Box>
  );
}
