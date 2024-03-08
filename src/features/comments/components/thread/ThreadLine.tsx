import { useThreadContext } from '../../hooks/thread/useThreadContext';
import { Box } from '@mui/material';
import React from 'react';

// line where thread was created
export default function ThreadLine () {
    const {
        lineNumber, lineContent, showLine,
    } = useThreadContext();

    if (!showLine) {
        return null;
    }

    return (
        <Box
            sx={{ backgroundColor: 'background.5' }}
            borderRadius={1}
            display="flex"
            alignItems="center"
            fontSize={15}
            border={1}
            borderColor="borders.5"
            mb={2}>
            <Box p={1} borderRight={1} borderColor="borders.5" color="secondary.main">
                {lineNumber}
            </Box>
            <Box p={1} color="secondary.main">
                {lineContent}
            </Box>
        </Box>
    );
}
