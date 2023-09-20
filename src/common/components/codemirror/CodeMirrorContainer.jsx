import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { HEADER_HEIGHT } from '../../../features/app/constants';

export default function CodeMirrorContainer({ children }) {
  return (
    <Box sx={{
      height: 1,
      background: 'transparent',
      borderRadius: 5,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      fontSize: {
        xs: 11,
        sm: 16,
      },
      '@media (max-width: 325px)': {
        fontSize: 9,
      },
      '.cm-theme': { height: 1 },
      '.cm-content': {
        whiteSpace_fallback: 'pre-wrap',
        whiteSpace: 'break-spaces',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
        flexShrink: 1,
        fontFamily: 'monospace',
        height: 1,
        ml: 1,
      },
      '.cm-line': {
        width: 'calc(100% - 8px)',
      },
      '.cm-focused': {
        outline: 'none!important',
      },
      '.cm-lineNumbers': {
        pl: {
          xs: 1.3,
          sm: 1,
        },
        pb: 2,
      },
      '.cm-gutterElement': {
        textAlign: 'left!important',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&.cm-activeLineGutter': {
          backgroundColor: 'none',
          background: 'transparent',
        },
        fontSize: {
          xs: 11,
          sm: 12,
        },
      },
      '.cm-gutters': {
        minHeight: 1,
        borderRight: 1,
        minWidth: {
          xs: '1px',
          md: HEADER_HEIGHT,
        },
        justifyContent: 'center',
        borderColor: 'borders.2',
      },
    }}
    >
      {children}
    </Box>
  );
}

CodeMirrorContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
