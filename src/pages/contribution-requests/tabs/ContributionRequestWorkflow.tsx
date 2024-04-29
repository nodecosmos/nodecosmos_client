import Loader from '../../../common/components/Loader';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import usePaneResizable from '../../../common/hooks/usePaneResizable';
import { selectIsPaneOpen } from '../../../features/app/app.selectors';
import { clearSelectedObject } from '../../../features/app/appSlice';
import Pane from '../../../features/app/components/pane/Pane';
import useBranchParams from '../../../features/branch/hooks/useBranchParams';
import { selectOptNode } from '../../../features/nodes/nodes.selectors';
import Workflow from '../../../features/workflows/components/Workflow';
import { WorkflowDiagramContext } from '../../../features/workflows/constants';
import { showWorkflow } from '../../../features/workflows/worfklow.thunks';
import { selectOptWorkflow } from '../../../features/workflows/workflow.selectors';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosTheme } from '../../../themes/type';
import { Box, useTheme } from '@mui/material';
import React, {
    useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ContributionRequestWorkflow() {
    const {
        originalId, branchId, nodeId,
    } = useBranchParams();
    const theme: NodecosmosTheme = useTheme();
    const dispatch: NodecosmosDispatch = useDispatch();
    const workflow = useSelector(selectOptWorkflow(branchId, nodeId));
    const originalWorkflow = useSelector(selectOptWorkflow(branchId, nodeId));
    const [loading, setLoading] = useState(true);
    const isPaneOpen = useSelector(selectIsPaneOpen);
    const workflowWidthFromLocalStorage = localStorage.getItem('workflowWidth');
    const workflowPaneWidthFromLocalStorage = localStorage.getItem('workflowPaneWidth');
    const workflowRef = useRef(null);
    const workflowDetailsRef = useRef(null);
    const [resizerHovered, hoverResizer, leaveResizer] = useBooleanStateValue();
    const node = useSelector(selectOptNode(branchId, nodeId));
    const rootId = node?.rootId;

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
        if (loading && rootId) {
            if (!originalWorkflow?.nodeId) {
                dispatch(showWorkflow({
                    rootId,
                    nodeId,
                    branchId: originalId,
                }));
            }
            dispatch(showWorkflow({
                rootId,
                nodeId,
                branchId,
            })).then(() => setLoading(false));
        }

        return () => {
            dispatch(clearSelectedObject());
        };
    }, [rootId, originalId, nodeId, dispatch, loading, branchId, originalWorkflow?.nodeId]);

    if (loading) {
        return <Loader />;
    }

    if (!workflow || !rootId) {
        throw new Error('originalWorkflow is not defined');
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
                    {workflow && <Workflow
                        nodeId={nodeId}
                        branchId={branchId}
                        context={WorkflowDiagramContext.workflowPage} />}
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
                    <Pane rootId={rootId} />
                </Box>
            </Box>
        </Box>
    );
}
