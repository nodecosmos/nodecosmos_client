import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { WORKFLOW_BUTTON_HEIGHT, WORKFLOW_BUTTON_WIDTH } from '../workflows.constants';

export default function WorkflowContainer(props) {
  return (
    <Box
      sx={{
        height: 1,
        transform: 'translateZ(0)',
        overflow: 'hidden',
        '.NodeButtonContainer': {
          display: 'flex',
          '.NodeButton': {
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: 'buttons.1',
            borderRadius: 1.5,
            py: 0,
            px: 2,
            border: 'none',
            maxWidth: 250,
            backgroundColor: 'red',
            height: WORKFLOW_BUTTON_HEIGHT,
            color: 'text.primary',
            '&.selected .fa-hashtag': {
              color: 'inherit',
            },
            '.NodeButtonText': {
              ml: 1,
              p: 0,
              backgroundColor: 'transparent',
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
        },
        '.WorkflowOutputButton': {
          height: WORKFLOW_BUTTON_HEIGHT,
          ml: 1,
          borderRadius: 1,
          minWidth: WORKFLOW_BUTTON_WIDTH,
          maxWidth: WORKFLOW_BUTTON_WIDTH,
          px: 1,
          transform: 'skewX(-30deg)',
          // boxShadow: 'buttons.1',
          '.IOButtonText': {
            mx: 1,
            p: 0,
            letterSpacing: '0.02857em',
            minWidth: 40,
            outline: 'none!important',
            cursor: 'pointer!important',
            pointerEvents: 'none',
            whiteSpace: 'nowrap', // otherwise safari will break two or more words into multiple lines
            transform: 'skewX(30deg)',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontWeight: 500,
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
