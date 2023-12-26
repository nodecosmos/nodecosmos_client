import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import usePaneResizable from '../../../common/hooks/usePaneResizable';
import { select } from '../../../features/nodes/actions';
import NodePane from '../../../features/nodes/components/pane/NodePane';
import Tree from '../../../features/nodes/components/tree/Tree';
import { showBranchNode } from '../../../features/nodes/nodes.thunks';
import { TreeType } from '../../../features/nodes/nodes.types';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosTheme } from '../../../themes/type';
import { NodecosmosError, UUID } from '../../../types';
import { Box, useTheme } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ContributionRequestTree() {
    const { id: nodeId, contributionRequestId } = useParams();
    const theme: NodecosmosTheme = useTheme();
    const treeWidthFromLocalStorage = localStorage.getItem('treeWidth');
    const nodePaneWidthFromLocalStorage = localStorage.getItem('nodePaneWidth');
    const paneARef = React.useRef(null);
    const paneBRef = React.useRef(null);
    const [resizerHovered, hoverResizer, leaveResizer] = useBooleanStateValue();
    const [isNodeFetched, setIsNodeFetched] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const branchId = contributionRequestId as UUID;
    const {
        paneAWidth,
        paneBWidth,
        handleResize,
        resizeInProgress,
    } = usePaneResizable({
        aRef: paneARef,
        bRef: paneBRef,
        initialWidthA: treeWidthFromLocalStorage,
        initialWidthB: nodePaneWidthFromLocalStorage,
    });
    const onResizerLeave = useCallback(() => {
        if (!resizeInProgress) {
            leaveResizer();
        }
    }, [resizeInProgress, leaveResizer]);

    if (!nodeId) {
        throw new Error('Node ID is not defined');
    }

    useEffect(() => {
        localStorage.setItem('treeWidth', paneAWidth);
        localStorage.setItem('nodePaneWidth', paneBWidth);
    }, [paneAWidth, paneBWidth]);

    useEffect(() => {
        if (!resizeInProgress) {
            leaveResizer();
        }
    }, [resizeInProgress, leaveResizer]);

    useEffect(() => {
        if (isNodeFetched) {
            return;
        }

        dispatch(showBranchNode({
            branchId: branchId as UUID,
            id: nodeId,
        })).then((response) => {
            setIsNodeFetched(true);

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;
                console.error(error);

                return;
            }

            dispatch(select({
                treeBranchId: branchId as UUID,
                id: nodeId,
                branchId: branchId as UUID,
            }));
        });
    }, [branchId, dispatch, isNodeFetched, nodeId]);

    return (
        <Box
            display={{
                xs: 'block',
                md: 'flex',
            }}
            width={1}
            height={1}
            overflow="hidden"
            style={{ cursor: resizeInProgress ? 'col-resize' : 'auto' }}
        >
            <Box
                ref={paneARef}
                width={paneAWidth}
                height={1}
                display="flex"
            >
                <Tree
                    treeBranchId={branchId}
                    rootNodeId={nodeId}
                    type={TreeType.ContributionRequest} />
                <Box
                    component="span"
                    onMouseDown={handleResize}
                    width="4px"
                    height={1}
                    ml={-0.5}
                    borderRight={1}
                    borderColor="transparent"
                    onMouseEnter={hoverResizer}
                    onMouseLeave={onResizerLeave}
                    sx={{
                        backgroundColor: 'transparent',
                        position: 'relative',
                        '&:hover': { cursor: 'col-resize' },
                    }}
                />
            </Box>
            <Box
                ref={paneBRef}
                height={1}
                width={paneBWidth}
                overflow="hidden"
                boxShadow="left.2"
                borderLeft={1}
                style={{
                    borderLeftColor: resizerHovered
                        ? theme.palette.borders['5'] : theme.palette.borders['3'],
                }}>
                <NodePane />
            </Box>
        </Box>
    );
}
