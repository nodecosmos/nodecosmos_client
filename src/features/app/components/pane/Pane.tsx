import Content from './content/Content';
import { UUID } from '../../../../types';
import { usePaneContextCreator } from '../../hooks/pane/usePaneContext';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
    rootId: UUID;
}

export default function Pane({ rootId }: Props) {
    const { PaneContext, CtxCreatorValue } = usePaneContextCreator(rootId);

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
