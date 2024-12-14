import PaneComments from './PaneComments';
import PaneDescription from './PaneDescription';
import PaneDescriptionEditor from './PaneDescriptionEditor';
import PaneMarkdownEditor from './PaneMarkdownEditor';
import PaneWorkflow from './PaneWorkflow';
import { HEADER_HEIGHT, MOBILE_TOOLBAR_HEIGHT } from '../../../constants';
import { PaneContent, usePaneContext } from '../../../hooks/pane/usePaneContext';
import useIsMobile from '../../../hooks/useIsMobile';
import PaneMobileToolbar from '../MobileToolbar';
import Toolbar from '../Toolbar';
import { Box, Typography } from '@mui/material';
import React from 'react';

const PANE_CONTENTS = {
    [PaneContent.Description]: PaneDescription,
    [PaneContent.Editor]: PaneDescriptionEditor,
    [PaneContent.Markdown]: PaneMarkdownEditor,
    [PaneContent.Workflow]: PaneWorkflow,
    [PaneContent.Comments]: PaneComments,
};

const BOX_HEIGHT_SX = {
    xs: `calc(100% - ${MOBILE_TOOLBAR_HEIGHT})`,
    md: `calc(100% - ${HEADER_HEIGHT})`,
};

export default function Content() {
    const { content, metadata } = usePaneContext();
    const PaneContent = PANE_CONTENTS[content];
    const isMobile = useIsMobile();

    if (metadata?.isTmp) {
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
                <Typography variant="h6" color="texts.secondary" textAlign="center">
                    Temporary object. Add title to initialize it.
                </Typography>
                <Typography variant="h5" color="texts.secondary" textAlign="center" mt={1}>
                    ¯\_(ツ)_/¯
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            className="overflow-hidden"
            component="section"
            width={1}
            height={1}
            overflow="hidden"
            position="relative"
            zIndex={1}
        >
            {isMobile ? <PaneMobileToolbar /> : <Toolbar />}
            <Box height={BOX_HEIGHT_SX} overflow="auto">
                <PaneContent />
            </Box>
        </Box>
    );
}
