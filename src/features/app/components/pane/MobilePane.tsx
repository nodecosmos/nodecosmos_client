import Content from './content/Content';
import { PaneProps } from './Pane';
import { DRAWER_HEIGHT, HEADER_HEIGHT } from '../../constants';
import useDrawer from '../../hooks/pane/useDrawer';
import { usePaneContextCreator } from '../../hooks/pane/usePaneContext';
import { Box, Typography } from '@mui/material';
import React from 'react';

export const MOBILE_PANE_HEIGHT = `calc(100% - ${HEADER_HEIGHT})`;

export default function MobilePane({ rootId, page }: PaneProps) {
    const { PaneContext, CtxCreatorValue } = usePaneContextCreator({
        rootId,
        page,
    });
    const [height, drawerRef, clickableRef] = useDrawer();

    if (!CtxCreatorValue.isObjectSelected) {
        return (
            <Box
                position="absolute"
                bottom={0}
                height={60}
                borderTop={1}
                borderColor="borders.1"
                boxShadow="8"
                width={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                sx={{ backgroundColor: 'background.5' }}
            >
                <Typography variant="body2" color="text.secondary" textAlign="center" fontWeight="bold">
                    Select an object to view its details.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            ref={drawerRef}
            position="absolute"
            bottom={0}
            height={DRAWER_HEIGHT}
            borderTop={1}
            borderColor="borders.1"
            boxShadow="8"
            width={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            style={{ height }}
            zIndex={1000}
            sx={{ backgroundColor: 'background.5' }}
        >
            <PaneContext.Provider value={CtxCreatorValue}>
                <Content clickableRef={clickableRef} />
            </PaneContext.Provider>
        </Box>
    );
}
