import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

export default function TreeContainer(props) {
  return (
    <Box sx={{
      height: 1,
      '.NodeButtonContainer': { display: 'flex' },
      '.NodeButton': {
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: 'buttons.1',
        borderRadius: 1.5,
        py: 0,
        px: 2,
        // border: 'none',
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
