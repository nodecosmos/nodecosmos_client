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

interface ClickableRefProps {
    clickableRef?: React.RefObject<HTMLDivElement> | null;
}

export default function Content({ clickableRef }: ClickableRefProps) {
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
                <Typography variant="h6" color="text.secondary" textAlign="center">
                    Temporary object. Add title to initialize it.
                </Typography>
                <Typography variant="h5" color="text.secondary" textAlign="center" mt={1}>
                    ¯\_(ツ)_/¯
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            component="section"
            width={1}
            height={1}
            sx={{
                overflow: 'hidden',
                backgroundColor: 'background.5',
            }}
            position="relative"
            zIndex={1}
        >
            {isMobile && clickableRef !== undefined ? <PaneMobileToolbar clickableRef={clickableRef} /> : <Toolbar />}
            <Box
                height={{
                    xs: `calc(100% - ${MOBILE_TOOLBAR_HEIGHT})`,
                    md: `calc(100% - ${HEADER_HEIGHT})`,
                }}
                overflow="auto"
            >
                <PaneContent />
            </Box>
        </Box>
    );
}
