import Loader from '../../common/components/Loader';
import useBooleanStateValue from '../../common/hooks/useBooleanStateValue';
import usePaneResizable from '../../common/hooks/usePaneResizable';
import { selectIsPaneOpen } from '../../features/app/app.selectors';
import WorkflowPane from '../../features/workflows/components/pane/WorkflowPane';
import Workflow from '../../features/workflows/components/Workflow';
import { showWorkflow } from '../../features/workflows/worfklow.thunks';
import { selectWorkflowByNodeId } from '../../features/workflows/workflow.selectors';
import { clearSelectedWorkflowDiagramObject } from '../../features/workflows/workflowsSlice';
import { NodecosmosDispatch } from '../../store';
import { NodecosmosTheme } from '../../themes/type';
import { UUID } from '../../types';
import { Box, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Show() {
    const { id: nodeId } = useParams();
    const theme: NodecosmosTheme = useTheme();

    const dispatch: NodecosmosDispatch = useDispatch();
    const workflow = useSelector(selectWorkflowByNodeId(nodeId as UUID));
    const isPaneOpen = useSelector(selectIsPaneOpen);

    const id = workflow?.id;

    const [loading, setLoading] = React.useState(!id);
    const [resizerHovered, hoverResizer, leaveResizer] = useBooleanStateValue();

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

    // useEffect(() => {
    //     if (!resizeInProgress) {
    //         leaveResizer();
    //     }
    // }, [leaveResizer, resizeInProgress]);

    if (loading) {
        return <Loader />;
    }

    const borderLeftColor = resizerHovered ? theme.palette.borders['5'] : theme.palette.borders['3'];

    return (
        <Box
            width={1}
            height={1}
        >
            <Box
                height={1}
                width={1}
                display="flex"
                style={{ cursor: resizeInProgress ? 'col-resize' : 'default' }}
            >
                <Box
                    height={1}
                    width={(isPaneOpen && paneAWidth) || '100%'}
                    ref={workflowRef}
                    overflow="hidden"
                >
                    <Workflow nodeId={nodeId as UUID} />
                </Box>
                <Box
                    component="div"
                    onMouseDown={handleResize}
                    onMouseEnter={hoverResizer}
                    onMouseLeave={leaveResizer}
                    width="8px"
                    // backgroundColor="transparent"
                    height={1}
                    ml={-1}
                    sx={{
                        position: 'relative',
                        '&:hover': { cursor: 'col-resize' },
                    }}
                />
                <Box
                    component="div"
                    // backgroundColor="background.5"
                    height={1}
                    display={isPaneOpen ? 'block' : 'none'}
                    width={(isPaneOpen && paneBWidth) || 0}
                    ref={workflowDetailsRef}
                    position="relative"
                    overflow="hidden"
                    boxShadow="left.2"
                    borderLeft={1}
                    zIndex={1}
                    style={{ borderLeftColor }}
                >
                    <WorkflowPane />
                </Box>
            </Box>
        </Box>
    );
}
