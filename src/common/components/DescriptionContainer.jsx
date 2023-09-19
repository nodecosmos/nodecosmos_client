import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// decide if we want to use width
export default function DescriptionContainer({ children, p, width }) {
  return (
    <Box
      p={p}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        height={1}
        sx={{
          maxWidth: 850,
          width: 1,
          color: 'text.secondary',
          'h1, h2, h3, h4, h5, h6': {
            marginBlockStart: 0,
            marginBlockEnd: 2,
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
            borderLeft: 4,
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
                backgroundColor: 'background.8',
              },
            },
          },
          pre: {
            ml: 0,
            p: 2,
            borderRadius: 1,
            backgroundColor: 'markdownContent.canvas',
            textWrap: 'wrap',
          },
          a: {
            color: 'text.link',
            fontWeight: 'bold',
          },
          p: {
            wordWrap: 'break-word',
          },
          'img:not(.ProseMirror-separator)': {
            maxWidth: 850,
            width: 1,
            borderRadius: 5,
            my: 2,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

DescriptionContainer.defaultProps = {
  p: 4,
  width: 1,
};

DescriptionContainer.propTypes = {
  children: PropTypes.node.isRequired,
  p: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
