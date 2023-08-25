import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { NODE_BUTTON_HEIGHT } from '../workflows.constants';

export default function WorkflowContainer(props) {
  return (
    <Box
      sx={{
        height: 1,
        transform: 'translateZ(0)',
        overflow: 'hidden',
        '.NodeButtonContainer': { display: 'flex' },
        '.WorkflowOutputButton': {
          height: NODE_BUTTON_HEIGHT,
          ml: 1,
          borderRadius: 1,
          minWidth: 150,
          maxWidth: 150,
          px: 1,
          transform: 'skewX(-30deg)',
          '.IOButtonText': {
            mx: 1,
            p: 0,
            fontFamily: 'Roboto, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '0.02857em',
            minWidth: 40,
            outline: 'none!important',
            cursor: 'pointer!important',
            pointerEvents: 'none',
            whiteSpace: 'nowrap', // otherwise safari will break two or more words into multiple lines
            transform: 'skewX(30deg)',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          },
        },
        '.NodeButton': {
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: 'buttons.1',
          borderRadius: 1.5,
          py: 0,
          px: 2,
          border: 'none',
          maxWidth: 292,
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
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          },
        },
      }}
    >
      {props.children}
    </Box>
  );
}

WorkflowContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
