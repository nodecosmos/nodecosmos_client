import {
    Typography, useMediaQuery, useTheme, Box,
} from '@mui/material';
import React from 'react';

export default function PanTip() {
    const theme = useTheme();
    const matchesLaptop = useMediaQuery(theme.breakpoints.up('md'));
    if (!matchesLaptop) return null;

    const isMac = navigator.userAgent.includes('Mac OS X');

    return (
        <Box mt={3}>
            <Typography
                variant="body2"
                sx={{ color: 'text.tertiary' }}
            >
                <b>Tip: </b>
        Use
                {
                    isMac ? ' ⌘ ' : ' Ctrl '
                }
        + Left Click to pan
                <br />
            </Typography>
        </Box>
    );
}
