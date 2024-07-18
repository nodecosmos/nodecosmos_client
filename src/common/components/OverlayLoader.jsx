import Loader from './Loader';
import { Box } from '@mui/material';
import React from 'react';

export default function OverlayLoader() {
    return (
        <Box
            position="absolute"
            top={0}
            left={0}
            width={1}
            height={1}
            sx={{
                backgroundColor: 'background.backdrop',
                opacity: 1,
                zIndex: 2,
            }}
        >
            <Loader color="secondary.main" />
        </Box>
    );
}
