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
} from '../../nodes.selectors';
import { getDescription } from '../../nodes.thunks';
import { NodePaneContent as NodePaneContentType, PKWithTreeBranch } from '../../nodes.types';
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface NodePaneProps {
    selected: PKWithTreeBranch;
    page?: 'nodes' | 'workflow';
}

export default function NodePaneContent({ page, selected }: NodePaneProps) {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        treeBranchId, branchId, id,
    } = selected;
    const rootId = useSelector(selectNodeAttribute(treeBranchId, id, 'rootId'));
    const isTmp = useSelector(selectNodeAttribute(treeBranchId, id, 'isTmp'));
    const title = useSelector(selectNodeAttribute(treeBranchId, id, 'title'));
    const nodePaneContent = useSelector(selectNodePaneContent);

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
            dispatch(getDescription({
                treeBranchId,
                branchId,
                id,
            }));
        }
    }, [branchId, dispatch, id, rootId, treeBranchId]);

    useEffect(() => {
        if (prevSelectedNodeId !== id && nodePaneContent !== NodePaneContentType.Workflow) {
            dispatch(setNodePaneContent(NodePaneContentType.Description));
        }
    }, [dispatch, prevSelectedNodeId, id, nodePaneContent]);

    let blankStateMessage = null;

    if (!id) {
        blankStateMessage = 'Select a node to view its details.';
    } else if (isTmp) {
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
                <SelectedComponent />
            </Box>
        </Box>
    );
}
