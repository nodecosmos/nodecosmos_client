import NodePaneDescription from './content/NodePaneDescription';
import NodePaneDescriptionEditor from './content/NodePaneDescriptionEditor';
import NodePaneMarkdownEditor from './content/NodePaneMarkdownEditor';
import NodePaneWorkflow from './content/NodePaneWorkflow';
import NodePaneToolbar, { Page } from './NodePaneToolbar';
import Loader from '../../../../common/components/Loader';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import usePrevious from '../../../../common/hooks/usePrevious';
import { NodecosmosDispatch } from '../../../../store';
import { HEADER_HEIGHT } from '../../../app/constants';
import { setNodePaneContent } from '../../actions';
import {
    selectNodePaneContent, selectSelected, selectSelectedNode,
} from '../../nodes.selectors';
import { getDescription } from '../../nodes.thunks';
import { NodePaneContent, NodePaneContent as NodePaneContentType } from '../../nodes.types';
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    const {
        rootId, isTmp, title, description,
    } = useSelector(selectSelectedNode);
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();
    const PaneContent = NODE_PANE_CONTENTS[nodePaneContent];
    const {
        treeBranchId, branchId, id,
    } = selectedPk;
    const prevSelectedNodeId = usePrevious(id);
    const dispatch: NodecosmosDispatch = useDispatch();

    useEffect(() => {
        if (id && rootId && !isTmp && !description && !loading) {
            setLoading();
            dispatch(getDescription({
                treeBranchId,
                branchId,
                id,
            })).finally(() => {
                setTimeout(unsetLoading, 250);
            });
        }
    }, [branchId, description, dispatch, id, isTmp, loading, rootId, setLoading, treeBranchId, unsetLoading]);

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
                {
                    loading
                        ? <Loader />
                        : <PaneContent />
                }
            </Box>
        </Box>
    );
}
