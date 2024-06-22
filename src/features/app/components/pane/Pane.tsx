import Content from './content/Content';
import MobilePane from './MobilePane';
import { UUID } from '../../../../types';
import { usePaneContextCreator } from '../../hooks/pane/usePaneContext';
import useIsMobile from '../../hooks/useIsMobile';
import { Box, Typography } from '@mui/material';
import React from 'react';

export enum PanePage {
    Tree,
    Workflow,
}

export interface PaneProps {
    rootId: UUID;
    page: PanePage;
}

export default function Pane({ rootId, page }: PaneProps) {
    const { PaneContext, CtxCreatorValue } = usePaneContextCreator({
        rootId,
        page,
    });

    const isMobile = useIsMobile();

    if (isMobile) {
        return <MobilePane rootId={rootId} page={page} />;
    }

    if (!CtxCreatorValue.isObjectSelected) {
        return (
            <Box
                height={1}
                width={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                className="background-5"
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
