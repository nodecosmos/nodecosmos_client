import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIOPaneContent } from '../../inputOutput.selectors';
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
      <IOPaneToolbar />
      {content}
    </Box>
  );
}
