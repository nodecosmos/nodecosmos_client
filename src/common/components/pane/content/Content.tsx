import PaneDescription from './PaneDescription';
import PaneDescriptionEditor from './PaneDescriptionEditor';
import PaneMarkdownEditor from './PaneMarkdownEditor';
import PaneWorkflow from './PaneWorkflow';
import { HEADER_HEIGHT } from '../../../../features/app/constants';
import { PaneContent, usePaneContext } from '../../../hooks/pane/usePaneContext';
import Toolbar from '../Toolbar';
import { Box } from '@mui/material';
import React from 'react';

const PANE_CONTENTS = {
    [PaneContent.Description]: PaneDescription,
    [PaneContent.Editor]: PaneDescriptionEditor,
    [PaneContent.Markdown]: PaneMarkdownEditor,
    [PaneContent.Workflow]: PaneWorkflow,
};

export default function Content() {
    const { content } = usePaneContext();
    const PaneContent = PANE_CONTENTS[content];

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
            <Toolbar />
            <Box height={`calc(100% - ${HEADER_HEIGHT})`} overflow="auto">
                <PaneContent />
            </Box>
        </Box>
    );
}
