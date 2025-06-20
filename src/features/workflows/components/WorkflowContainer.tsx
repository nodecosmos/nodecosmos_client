import {
    WORKFLOW_BUTTON_HEIGHT, OUTPUT_BUTTON_WIDTH, WORKFLOW_BUTTON_WIDTH,
} from '../workflows.constants';
import { Box } from '@mui/material';
import React from 'react';

const SX = {
    height: 1,
    transform: 'translateZ(0)',
    overflow: 'hidden',
    background: 'backgrounds.8',
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
            maxWidth: WORKFLOW_BUTTON_WIDTH,
            backgroundColor: 'tree.default',
            height: WORKFLOW_BUTTON_HEIGHT,
            color: 'texts.primary',
            '&.selected .fa-hashtag': { color: 'inherit' },
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
        display: 'inline-flex',
        alignItems: 'center',
        height: WORKFLOW_BUTTON_HEIGHT,
        ml: 1,
        borderRadius: 1,
        minWidth: OUTPUT_BUTTON_WIDTH,
        maxWidth: OUTPUT_BUTTON_WIDTH,
        px: 1,
        transform: 'skewX(-30deg)',
        cursor: 'pointer',
        overflow: 'hidden',
        // boxShadow: 'buttons.1',
        '.IoButtonText, .MuiCheckbox-root, .loader': { transform: 'skewX(30deg)' },
        '.IoButtonText': {
            mx: 1,
            p: 0,
            letterSpacing: '0.02857em',
            minWidth: 40,
            outline: 'none!important',
            cursor: 'pointer!important',
            pointerEvents: 'none',
            whiteSpace: 'nowrap', // otherwise safari will break two or more words into multiple lines
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontWeight: 500,
        },
        '.loader': {
            mt: 0.5,
            mx: 0.5,
            svg: { color: 'toolbar.default' },
        },
    },
    '.InputLink': { pointerEvents: 'none' },
    '.InputLinkText': {
        fontSize: 14,
        fontWeight: 500,
    },
};

export default function WorkflowContainer({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={SX}>
            {children}
        </Box>
    );
}
