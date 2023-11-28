import NodePaneDescription from './content/NodePaneDescription';
import NodePaneDescriptionEditor from './content/NodePaneDescriptionEditor';
import NodePaneMarkdownEditor from './content/NodePaneMarkdownEditor';
import NodePaneWorkflow from './content/NodePaneWorkflow';
import NodePaneToolbar from './NodePaneToolbar';
import usePrevious from '../../../../common/hooks/usePrevious';
import { NodecosmosDispatch } from '../../../../store';
import { HEADER_HEIGHT } from '../../../app/constants';
import { setNodePaneContent } from '../../actions';
import {
    selectNodeAttribute,
    selectNodePaneContent,
    selectSelectedNodePrimaryKey,
} from '../../nodes.selectors';
import { getNodeDescription } from '../../nodes.thunks';
import { NodePaneContent as NodePaneContentType, NodePrimaryKey } from '../../nodes.types';
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface NodePaneProps {
    page?: 'nodes' | 'workflow';
}

export default function NodePaneContent({ page }: NodePaneProps) {
    const { branchId, id } = useSelector(selectSelectedNodePrimaryKey) as NodePrimaryKey;
    const rootId = useSelector(selectNodeAttribute(branchId, id, 'rootId'));
    const isTemp = useSelector(selectNodeAttribute(branchId, id, 'isTemp'));
    const nodePaneContent = useSelector(selectNodePaneContent);
    const title = useSelector(selectNodeAttribute(branchId, id, 'title'));
    const dispatch: NodecosmosDispatch = useDispatch();

    const nodePaneContents = {
        description: NodePaneDescription,
        markdown: NodePaneMarkdownEditor,
        editor: NodePaneDescriptionEditor,
        workflow: NodePaneWorkflow,
    };

    const SelectedComponent = nodePaneContents[nodePaneContent];

    const prevSelectedNodeId = usePrevious(id);

    useEffect(() => {
        if (id && rootId) {
            dispatch(getNodeDescription({ branchId, id }));
        }
    }, [dispatch, branchId, id, rootId]);

    useEffect(() => {
        if (prevSelectedNodeId !== id && nodePaneContent !== NodePaneContentType.Workflow) {
            dispatch(setNodePaneContent(NodePaneContentType.Description));
        }
    }, [dispatch, prevSelectedNodeId, id, nodePaneContent]);

    let blankStateMessage = null;

    if (!id) {
        blankStateMessage = 'Select a node to view its details.';
    } else if (isTemp) {
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
            sx={{ overflow: 'hidden', backgroundColor: 'background.5' }}
            position="relative"
            zIndex={1}
        >
            <NodePaneToolbar page={page} />
            <Box height={`calc(100% - ${HEADER_HEIGHT})`} overflow="auto">
                <SelectedComponent />
            </Box>
        </Box>
    );
}
