import { Box, Typography } from '@mui/material';
import React from 'react';

export default function NotFound() {
    return (
        <Box width={1} height={1} display="flex" alignItems="center" justifyContent="center">
            <Box width={320} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Typography variant="h1" fontSize={47}>404 Not Found</Typography>
                <Box component="span" fontSize={75} width={1} textAlign="center">
                    ¯\_(ツ)_/¯
                </Box>
            </Box>
        </Box>
    );
}
