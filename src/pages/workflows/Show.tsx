import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../common/components/Loader';
import usePaneResizable from '../../common/hooks/usePaneResizable';
import Workflow from '../../features/workflows/components/Workflow';
import WorkflowPane from '../../features/workflows/components/pane/WorkflowPane';
import { selectIsWfPaneOpen, selectWorkflowByNodeId } from '../../features/workflows/workflows.selectors';
import { showWorkflow } from '../../features/workflows/workflows.thunks';
import Alert from '../../common/components/Alert';
import { clearSelectedWorkflowDiagramObject } from '../../features/workflows/workflowsSlice';
import { NodecosmosDispatch } from '../../store';
import { UUID } from '../../types';
import { NodecosmosTheme } from '../../themes/type';

export default function Show() {
    const { id: nodeId } = useParams();
    const theme: NodecosmosTheme = useTheme();

    const dispatch: NodecosmosDispatch = useDispatch();
    const workflow = useSelector(selectWorkflowByNodeId(nodeId as UUID));

    const id = workflow?.id;

    const [loading, setLoading] = React.useState(!id);
    const [resizerHovered, setResizerHovered] = React.useState(false);

    const isWfPaneOpen = useSelector(selectIsWfPaneOpen);

    const workflowWidthFromLocalStorage = localStorage.getItem('workflowWidth');
    const workflowPaneWidthFromLocalStorage = localStorage.getItem('workflowPaneWidth');

    const workflowRef = React.useRef(null);
    const workflowDetailsRef = React.useRef(null);

    const {
        paneAWidth,
        paneBWidth,
        handleResize,
        resizeInProgress,
    } = usePaneResizable({
        aRef: workflowRef,
        bRef: workflowDetailsRef,
        initialWidthA: workflowWidthFromLocalStorage || '70%',
        initialWidthB: workflowPaneWidthFromLocalStorage || '30%',
    });

    useEffect(() => {
        localStorage.setItem('workflowWidth', paneAWidth);
        localStorage.setItem('workflowPaneWidth', paneBWidth);
    }, [paneAWidth, paneBWidth]);

    useEffect(() => {
        if (!id) {
            setLoading(true);
            dispatch(showWorkflow(nodeId as UUID)).then(() => setLoading(false));
        } else {
            setLoading(false);
        }

        return () => {
            dispatch(clearSelectedWorkflowDiagramObject());
        };
    }, [dispatch, id, nodeId]);

    useEffect(() => {
        if (!resizeInProgress) {
            setResizerHovered(false);
        }
    }, [resizeInProgress]);

    if (loading) {
        return <Loader />;
    }

    return (
        <Box
            width={1}
            height={1}
        >
            <Box
                height={1}
                width={1}
                display="flex"
                style={{
                    cursor: resizeInProgress ? 'col-resize' : 'default',
                }}
            >
                <Box
                    height={1}
                    width={(isWfPaneOpen && paneAWidth) || '100%'}
                    ref={workflowRef}
                    overflow="hidden"
                >
                    <Alert />
                    <Workflow nodeId={nodeId as UUID} />
                </Box>
                <Box
                    component="div"
                    onMouseDown={handleResize}
                    onMouseEnter={() => setResizerHovered(true)}
                    onMouseLeave={() => {
                        if (!resizeInProgress) {
                            setResizerHovered(false);
                        }
                    }}
                    width="8px"
                    // backgroundColor="transparent"
                    height={1}
                    ml={-1}
                    sx={{
                        position: 'relative',
                        '&:hover': {
                            cursor: 'col-resize',
                        },
                    }}
                />
                <Box
                    component="div"
                    // backgroundColor="background.5"
                    height={1}
                    display={isWfPaneOpen ? 'block' : 'none'}
                    width={(isWfPaneOpen && paneBWidth) || 0}
                    ref={workflowDetailsRef}
                    overflow="hidden"
                    boxShadow="left.2"
                    borderLeft={1}
                    style={{
                        borderLeftColor: resizerHovered ? theme.palette.borders['5'] : theme.palette.borders['3'],
                    }}
                >
                    <WorkflowPane />
                </Box>
            </Box>
        </Box>
    );
}
