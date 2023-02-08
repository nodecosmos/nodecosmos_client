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
        borderRadius: 1.5,
        py: 0,
        px: 2,
        cursor: 'pointer',
        boxShadow: '2px 2px 0px rgb(0 0 0 / 0.15)',
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
