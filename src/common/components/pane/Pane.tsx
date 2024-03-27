import Content from './content/Content';
import { usePaneContextCreator } from '../../hooks/pane/usePaneContext';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Pane() {
    const { PaneContext, CtxCreatorValue } = usePaneContextCreator();

    if (!CtxCreatorValue.isObjectSelected) {
        return (
            <Box
                m={3}
                height={1}
                width={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <Typography variant="h6" color="text.secondary" textAlign="center">
                    Select an object to view its details.
                </Typography>
                <Typography variant="h5" color="text.secondary" textAlign="center" mt={1}>
                    ¯\_(ツ)_/¯
                </Typography>
            </Box>
        );
    }

    return (
        <PaneContext.Provider value={CtxCreatorValue}>
            <Content />
        </PaneContext.Provider>
    );
}
