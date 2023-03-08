import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

export default function TreeContainer(props) {
  return (
    <Box sx={{
      height: 1,
      transform: 'translateZ(0)',
      overflow: 'hidden',
      '.NodeButtonContainer': { display: 'flex' },
      '.NodeButton': {
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: 'buttons.1',
        borderRadius: 1.5,
        py: 0,
        px: 2,
        border: 'none',
        '.fa-hashtag': {
          fontSize: 14,
          color: 'tree.hashtag',
        },
        '&.selected .fa-hashtag': {
          color: 'inherit',
        },
        '.NodeButtonText': {
          ml: 1,
          p: 0,
          backgroundColor: 'transparent',
          fontFamily: 'Roboto, sans-serif',
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: '0.02857em',
          minWidth: 40,
          outline: 'none!important',
          cursor: 'pointer!important',
          pointerEvents: 'none',
          whiteSpace: 'nowrap', // otherwise safari will break two or more words into multiple lines
        },
      },
    }}
    >
      {props.children}
    </Box>
  );
}

TreeContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
