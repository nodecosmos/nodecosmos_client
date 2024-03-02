import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

interface Props {
    backgroundColor?: string;
    color?: string;
    size?: number;
    width?: number;
    ml?: number;
    p?: number;
}

export default function Loader(props: Props) {
    const {
        backgroundColor, color = 'background.8', size = 100, width = 1, ml = 0, p = 0,
    } = props;

    return (
        <Box
            height={1}
            width={width}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
                backgroundColor,
                ml,
                p,
            }}
        >
            <CircularProgress
                size={size}
                sx={{ color }}
            />
        </Box>
    );
}
