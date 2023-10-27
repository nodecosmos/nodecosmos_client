import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export default function ToolsContainer({ children }) {
    return (
        <Box
            display="flex"
            alignItems="center"
            sx={{
                ml: 1,
                width: 1,
                flex: 1,
                '.Item': {
                    width: 31,
                    height: 1,
                    mx: 0.1,
                    borderRadius: 1,
                    '&:hover': { backgroundColor: 'toolbar.hover' },
                },
                '.svg-inline--fa, .MuiSvgIcon-root': {
                    fontSize: 16,
                    opacity: 0,
                    animation: 'appear 0.25s forwards',
                },
            }}
        >
            {children}
        </Box>
    );
}

ToolsContainer.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
