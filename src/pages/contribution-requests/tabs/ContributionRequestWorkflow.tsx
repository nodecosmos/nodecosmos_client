import Loader from '../../../common/components/Loader';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import usePaneResizable from '../../../common/hooks/usePaneResizable';
import { selectIsPaneOpen } from '../../../features/app/app.selectors';
import WorkflowPane from '../../../features/workflows/components/pane/WorkflowPane';
import Workflow from '../../../features/workflows/components/Workflow';
import { WorkflowDiagramContext } from '../../../features/workflows/constants';
import { showWorkflow } from '../../../features/workflows/worfklow.thunks';
import { clearSelectedWorkflowDiagramObject } from '../../../features/workflows/workflowsSlice';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosTheme } from '../../../themes/type';
import { UUID } from '../../../types';
import { Box, useTheme } from '@mui/material';
import React, {
    useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ContributionRequestWorkflow() {
    const { id } = useParams();
    const theme: NodecosmosTheme = useTheme();
    const dispatch: NodecosmosDispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const isPaneOpen = useSelector(selectIsPaneOpen);

    const workflowWidthFromLocalStorage = localStorage.getItem('workflowWidth');
    const workflowPaneWidthFromLocalStorage = localStorage.getItem('workflowPaneWidth');

    const workflowRef = useRef(null);
    const workflowDetailsRef = useRef(null);

    const [resizerHovered, hoverResizer, leaveResizer] = useBooleanStateValue();

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
        if (loading) {
            dispatch(showWorkflow(id as UUID)).then(() => setLoading(false));
        }

        return () => {
            dispatch(clearSelectedWorkflowDiagramObject());
        };
    }, [dispatch, id, loading]);

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
                    <Workflow nodeId={id as UUID} context={WorkflowDiagramContext.workflowPage} />
                </Box>
                <Box
                    onMouseDown={handleResize}
                    onMouseEnter={hoverResizer}
                    onMouseLeave={leaveResizer}
                    width="8px"
                    height={1}
                    ml={-1}
                    sx={{
                        backgroundColor: 'transparent',
                        position: 'relative',
                        '&:hover': { cursor: 'col-resize' },
                    }}
                />
                <Box
                    height={1}
                    display={isPaneOpen ? 'block' : 'none'}
                    width={(isPaneOpen && paneBWidth) || 0}
                    ref={workflowDetailsRef}
                    overflow="hidden"
                    boxShadow="left.2"
                    borderLeft={1}
                    style={{ borderLeftColor }}
                    sx={{ backgroundColor: 'background.5' }}
                >
                    <WorkflowPane />
                </Box>
            </Box>
        </Box>
    );
}
