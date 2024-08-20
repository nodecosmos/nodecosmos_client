import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx';
import React, { useMemo } from 'react';

interface Props {
    backgroundColor?: string;
    color?: string;
    size?: number;
    width?: string | number | ResponsiveStyleValue<string | number>;
    ml?: number;
    p?: number;
}

function Loader(props: Props) {
    const {
        backgroundColor, color = 'background.8', size = 100, width = 1, ml = 0, p = 0,
    } = props;

    const sx = useMemo(() => ({
        backgroundColor,
        ml,
        p,
    }), [backgroundColor, ml, p]);

    const colorSx = useMemo(() => ({ color }), [color]);

    return (
        <Box
            height={1}
            width={width}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={sx}
        >
            <CircularProgress size={size} sx={colorSx} />
        </Box>
    );
}

export default React.memo(Loader);
