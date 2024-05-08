import Loader from '../../common/components/Loader';
import useBooleanStateValue from '../../common/hooks/useBooleanStateValue';
import usePaneResizable from '../../common/hooks/usePaneResizable';
import { selectIsPaneOpen } from '../../features/app/app.selectors';
import Pane, { PanePage } from '../../features/app/components/pane/Pane';
import useBranchContext from '../../features/branch/hooks/useBranchContext';
import { maybeSelectNode } from '../../features/nodes/nodes.selectors';
import Workflow from '../../features/workflows/components/Workflow';
import { showWorkflow } from '../../features/workflows/worfklow.thunks';
import { maybeSelectWorkflow } from '../../features/workflows/workflow.selectors';
import { NodecosmosDispatch } from '../../store';
import { NodecosmosTheme } from '../../themes/type';
import { Box, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Show() {
    const {
        originalId, branchId, nodeId, isBranch,
    } = useBranchContext();
    const theme: NodecosmosTheme = useTheme();

    const dispatch: NodecosmosDispatch = useDispatch();
    const workflow = useSelector(maybeSelectWorkflow(branchId, nodeId));
    const isPaneOpen = useSelector(selectIsPaneOpen);
    const node = useSelector(maybeSelectNode(branchId, nodeId));
    const rootId = node?.rootId;

    const workflowNodeId = workflow?.nodeId;

    const [loading, setLoading] = React.useState(!workflowNodeId);
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
        if (!workflowNodeId && rootId) {
            dispatch(showWorkflow({
                rootId,
                nodeId,
                branchId: originalId,
            })).then(() => {
                if (!isBranch) {
                    setLoading(false);
                }
            });
        } else {
            setLoading(false);
        }
    }, [originalId, branchId, dispatch, workflowNodeId, nodeId, rootId, isBranch]);

    useEffect(() => {
        if (isBranch && rootId) {
            console.log('showBranchWorkflow');
            //
            dispatch(showWorkflow({
                rootId,
                nodeId,
                branchId,
            })).then(() => {
                setLoading(false);
            });
        }
    }, [branchId, dispatch, isBranch, nodeId, rootId]);

    if (loading || !rootId) {
        return <Loader />;
    }

    if (!workflow) {
        throw new Error('Workflow not found');
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
                    {workflow && <Workflow nodeId={nodeId} branchId={branchId} />}
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
                    zIndex={1000}
                    style={{ borderLeftColor }}
                >
                    <Pane rootId={rootId} page={PanePage.Workflow} />
                </Box>
            </Box>
        </Box>
    );
}
