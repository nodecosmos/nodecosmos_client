import NodePaneDescription from './content/NodePaneDescription';
import NodePaneDescriptionEditor from './content/NodePaneDescriptionEditor';
import NodePaneMarkdownEditor from './content/NodePaneMarkdownEditor';
import NodePaneWorkflow from './content/NodePaneWorkflow';
import NodePaneToolbar, { Page } from './NodePaneToolbar';
import { HEADER_HEIGHT } from '../../../app/constants';
import { useNodePaneContext } from '../../hooks/pane/useNodePaneContext';
import { selectNodePaneContent, selectSelected } from '../../nodes.selectors';
import { NodePaneContent } from '../../nodes.types';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

interface NodePaneProps {
    page?: Page;
}

const NODE_PANE_CONTENTS = {
    [NodePaneContent.Description]: NodePaneDescription,
    [NodePaneContent.Markdown]: NodePaneMarkdownEditor,
    [NodePaneContent.Editor]: NodePaneDescriptionEditor,
    [NodePaneContent.Workflow]: NodePaneWorkflow,
};

export default function Content({ page }: NodePaneProps) {
    const selectedPk = useSelector(selectSelected);
    if (!selectedPk) {
        throw new Error('NodePaneContent: selected node is required');
    }
    const nodePaneContent = useSelector(selectNodePaneContent);
    const { title, isTmp } = useNodePaneContext();
    const PaneContent = NODE_PANE_CONTENTS[nodePaneContent];

    let blankStateMessage = null;

    if (isTmp) {
        blankStateMessage = 'Selected node is not initialized yet.';

        if (!title) {
            blankStateMessage += ' Please add a title to create a node.';
        }
    }

    if (blankStateMessage) {
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
                    {blankStateMessage}
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
            <NodePaneToolbar page={page} />
            <Box height={`calc(100% - ${HEADER_HEIGHT})`} overflow="auto">
                <PaneContent />
            </Box>
        </Box>
    );
}
