import Loader from '../../../common/components/Loader';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import usePaneResizable from '../../../common/hooks/usePaneResizable';
import { selectIsPaneOpen } from '../../../features/app/app.selectors';
import Pane, { PanePage } from '../../../features/app/components/pane/Pane';
import { MD_FLEX, MOBILE_NO_HEIGHT } from '../../../features/app/constants';
import useIsMobile from '../../../features/app/hooks/useIsMobile';
import useBranchContext from '../../../features/branch/hooks/useBranchContext';
import { maybeSelectNode } from '../../../features/nodes/nodes.selectors';
import Workflow from '../../../features/workflows/components/Workflow';
import { showWorkflow } from '../../../features/workflows/worfklow.thunks';
import { maybeSelectWorkflow } from '../../../features/workflows/workflow.selectors';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosTheme } from '../../../themes/themes.types';
import { Box, useTheme } from '@mui/material';
import React, {
    useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CR_WORKFLOW_WIDTH = 'contribution-request-workflow-width';
const CR_WORKFLOW_PANE_WIDTH = 'contribution-request-workflow-pane-width';

export default function ContributionRequestWorkflow() {
    const {
        originalId, branchId, nodeId,
    } = useBranchContext();
    const theme: NodecosmosTheme = useTheme();
    const dispatch: NodecosmosDispatch = useDispatch();
    const workflow = useSelector(maybeSelectWorkflow(branchId, nodeId));
    const originalWorkflow = useSelector(maybeSelectWorkflow(originalId, nodeId));
    const branchWorkflow = useSelector(maybeSelectWorkflow(branchId, nodeId));
    const isPaneOpen = useSelector(selectIsPaneOpen);
    const workflowRef = useRef(null);
    const workflowDetailsRef = useRef(null);
    const [resizerHovered, hoverResizer, leaveResizer] = useBooleanStateValue();
    const node = useSelector(maybeSelectNode(branchId, nodeId));
    const rootId = node?.rootId;
    const [loading, setLoading] = useState(!workflow);
    const isMobile = useIsMobile();

    const {
        paneAWidth,
        paneBWidth,
        handleResize,
        resizeInProgress,
    } = usePaneResizable({
        aRef: workflowRef,
        bRef: workflowDetailsRef,
        initialWidthA: localStorage.getItem(CR_WORKFLOW_WIDTH) || '70%',
        initialWidthB: localStorage.getItem(CR_WORKFLOW_PANE_WIDTH) || '30%',
    });

    useEffect(() => {
        if (isMobile) return;

        localStorage.setItem(CR_WORKFLOW_WIDTH, paneAWidth);
        localStorage.setItem(CR_WORKFLOW_PANE_WIDTH, paneBWidth);
    }, [isMobile, paneAWidth, paneBWidth]);

    useEffect(() => {
        if (loading && rootId && !originalWorkflow) {
            dispatch(showWorkflow({
                rootId,
                nodeId,
                branchId: originalId,
            }));
        }
    }, [dispatch, loading, nodeId, originalId, originalWorkflow, rootId]);

    useEffect(() => {
        if (loading && rootId && !branchWorkflow) {
            dispatch(showWorkflow({
                rootId,
                nodeId,
                branchId,
            })).then(() => setLoading(false));
        }
    }, [branchId, branchWorkflow, dispatch, loading, nodeId, rootId]);

    const resizerStyle = useMemo(() => (
        { borderLeftColor: resizerHovered ? theme.palette.borders['5'] : theme.palette.borders['3'] }
    ), [resizerHovered, theme.palette.borders]);

    if (loading || !rootId) {
        return <Loader />;
    }

    if (!workflow) {
        throw new Error('workflow is not defined');
    }

    return (
        <Box
            width={1}
            height={1}
        >
            <Box
                height={1}
                width={1}
                display={MD_FLEX}
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
                <div
                    className="Resizer"
                    onMouseDown={handleResize}
                    onMouseEnter={hoverResizer}
                    onMouseLeave={leaveResizer}
                />
                <Box
                    height={MOBILE_NO_HEIGHT}
                    display={isPaneOpen ? 'block' : 'none'}
                    width={(isPaneOpen && paneBWidth) || 0}
                    ref={workflowDetailsRef}
                    overflow="hidden"
                    boxShadow="left.2"
                    borderLeft={1}
                    style={resizerStyle}
                    sx={{ backgroundColor: 'background.5' }}
                >
                    <Pane rootId={rootId} page={PanePage.Workflow} />
                </Box>
            </Box>
        </Box>
    );
}
