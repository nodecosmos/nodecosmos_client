import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { NODE_BUTTON_HEIGHT } from '../trees.constants';

export default function TreeContainer({ children }) {
    return (
        <Box
            sx={{
                width: 1,
                height: 1,
                transform: 'translateZ(0)',
                overflow: 'hidden',
                '.NodeButtonContainer': {
                    display: 'flex',
                    alignItems: 'start',
                    height: 1,
                },
                '.NodeButton': {
                    height: NODE_BUTTON_HEIGHT,
                    display: 'inline-flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: 'buttons.1',
                    borderRadius: 1.25,
                    py: 0,
                    px: 1.75,
                    border: 'none',
                    ':focus': {
                        outline: 'none',
                    },
                    ':not(.outlined) .fa-hashtag ': {
                        fontSize: 14,
                        color: 'tree.hashtag',
                    },
                    '&.selected .fa-hashtag': {
                        color: 'inherit',
                        fontWeight: 700,
                    },
                    '.NodeButtonText': {
                        cursor: 'pointer',
                        ml: 1,
                        p: 0,
                        backgroundColor: 'transparent',
                        // fontFamily: 'Roboto, sans-serif',
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: '0.02857em',
                        minWidth: 40,
                        outline: 'none!important',
                        whiteSpace: 'nowrap', // otherwise safari will break two or more words into multiple lines
                        '&.hovered': {
                            cursor: 'text',
                        },
                        '&.Input': {
                            cursor: 'text!important',
                            fontFamily: 'monospace',
                            // textAlign: 'center',
                        },
                    },
                    '&.selected': {
                        '.NodeButtonText': {
                            fontWeight: 500,
                        },
                    },
                    '.MuiCheckbox-root': {
                        p: 0,
                        svg: {
                            fontSize: '1.4rem',
                        },
                    },
                },
            }}
        >
            {children}
        </Box>
    );
}

TreeContainer.propTypes = {
    children: PropTypes.node.isRequired,
};
