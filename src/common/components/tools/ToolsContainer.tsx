import { Box } from '@mui/material';
import React from 'react';

interface ToolsContainerProps {
    children: React.ReactNode;
    justifyContent?: string;
    ml?: number;
}

export default function ToolsContainer(props: ToolsContainerProps) {
    const {
        children,
        justifyContent = 'start',
        ml = 0,
    } = props;

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent={justifyContent}
            sx={{
                ml,
                width: 1,
                flex: 1,
                '.Item': {
                    width: 31,
                    height: 1,
                    mx: 0.1,
                    borderRadius: '50%',
                    '&:hover': { backgroundColor: 'toolbar.hover' },
                },
                '.MuiButtonBase-root > .svg-inline--fa, .MuiSvgIcon-root': { fontSize: 16 },
            }}
        >
            {children}
        </Box>
    );
}
