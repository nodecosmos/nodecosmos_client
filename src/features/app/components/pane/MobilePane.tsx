import Content from './content/Content';
import { PaneProps } from './Pane';
import { DRAWER_HEIGHT, HEADER_HEIGHT } from '../../constants';
import { usePaneContextCreator } from '../../hooks/pane/usePaneContext';
import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';

export const MOBILE_PANE_HEIGHT = `calc(100% - ${HEADER_HEIGHT})`;
const SX = { backgroundColor: 'background.5' };

export default function MobilePane({ rootId, page }: PaneProps) {
    const { PaneContext, CtxCreatorValue } = usePaneContextCreator({
        rootId,
        page,
    });

    const style = useMemo(() => ({ height: CtxCreatorValue.mobilePaneHeight }), [CtxCreatorValue.mobilePaneHeight]);

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
                sx={SX}
            >
                <Typography variant="body2" color="text.secondary" textAlign="center" fontWeight="bold">
                    Select an object to view its details.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            className="MobilePane"
            id="MobilePane"
            position="absolute"
            bottom={0}
            height={DRAWER_HEIGHT}
            borderTop={1}
            borderColor="borders.1"
            boxShadow="top.2"
            width={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            style={style}
            zIndex={1000}
            sx={SX}
        >
            <PaneContext.Provider value={CtxCreatorValue}>
                <Content />
            </PaneContext.Provider>
        </Box>
    );
}
