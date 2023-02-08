import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownPreview(props) {
  const { value } = props;

  return (
    <Box sx={{
      a: {
        color: 'text.sectionSecondary',
        borderBottom: 3,
        borderColor: 'text.sectionSecondary',
      },
    }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
    </Box>
  );
}

MarkdownPreview.propTypes = {
  value: PropTypes.string.isRequired,
};
