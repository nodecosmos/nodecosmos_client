import { Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function UploadDashboardContainer({ children }) {
    const theme = useTheme();

    return (
        <Box sx={{
            '.uppy-Dashboard-inner': {
                backgroundColor: 'transparent!important',
                border: 'none!important',
                width: '100%!important',
            },
            '.uppy-DashboardContent-panel, .uppy-Dashboard-FileCard, .uppy-StatusBar, .uppy-StatusBar-actions': {
                backgroundColor: 'transparent!important',
                borderTop: 'none!important',
            },
            '.uppy-StatusBar:before': {
                backgroundColor: 'transparent!important',
            },
            '.uppy-DashboardContent-bar': {
                backgroundColor: 'transparent!important',
                p: '0!important',
            },
            '.uppy-Dashboard-AddFiles': {
                border: 'none!important',
            },
            '.uppy-Dashboard-AddFiles-title': {
                color: `${theme.palette.text.secondary}!important`,
            },
            '.uppy-Dashboard-poweredBy, .uppy-DashboardContent-title': {
                display: 'none',
            },
            '.uppy-Dashboard-browse': {
                color: `${theme.palette.button.contrastText}!important`,
                p: 1,
                px: 2,
                ml: 0.25,
                fontSize: '1rem',
                border: `1px solid ${theme.palette.borders['4']}!important`,
                borderRadius: 1,
                backgroundColor: 'button.main',
            },
            '.uppy-DashboardContent-back, .uppy-DashboardContent-save': {
                marginLeft: '0!important',
                border: 1,
                borderColor: 'borders.4',
                width: '75px',
                color: `${theme.palette.button.contrastText}!important`,
                padding: '10px 16px',
                borderRadius: 1,

            },
            '.cropper-modal': {
                backgroundColor: '#ffffff5c',
            },
        }}
        >
            {children}
        </Box>
    );
}

UploadDashboardContainer.propTypes = {
    children: PropTypes.node.isRequired,
};
