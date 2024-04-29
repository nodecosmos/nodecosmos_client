import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import usePaneResizable from '../../../common/hooks/usePaneResizable';
import Pane from '../../../features/app/components/pane/Pane';
import { selectBranch } from '../../../features/branch/branches.selectors';
import useBranchParams from '../../../features/branch/hooks/useBranchParams';
import Tree from '../../../features/nodes/components/tree/Tree';
import { TreeType } from '../../../features/nodes/nodes.types';
import { NodecosmosTheme } from '../../../themes/type';
import { Box, useTheme } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ContributionRequestTree() {
    const theme: NodecosmosTheme = useTheme();
    const { nodeId, branchId } = useBranchParams();
    const branch = useSelector(selectBranch(branchId));
    const treeWidthFromLocalStorage = localStorage.getItem('treeWidth');
    const nodePaneWidthFromLocalStorage = localStorage.getItem('nodePaneWidth');
    const paneARef = React.useRef(null);
    const paneBRef = React.useRef(null);
    const [resizerHovered, hoverResizer, leaveResizer] = useBooleanStateValue();
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

    useEffect(() => {
        localStorage.setItem('treeWidth', paneAWidth);
        localStorage.setItem('nodePaneWidth', paneBWidth);
    }, [paneAWidth, paneBWidth]);

    useEffect(() => {
        if (!resizeInProgress) {
            leaveResizer();
        }
    }, [resizeInProgress, leaveResizer]);

    const rootId = branch?.rootId;

    if (!rootId) {
        return null;
    }

    return (
        <Box
            display={{
                xs: 'block',
                md: 'flex',
            }}
            width={1}
            height={1}
            overflow="hidden"
            style={{ cursor: resizeInProgress ? 'col-resize' : 'inherit' }}
        >
            <Box
                ref={paneARef}
                width={paneAWidth}
                height={1}
                display="flex"
            >
                <Tree
                    branchId={branchId}
                    rootId={nodeId}
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
                <Pane rootId={rootId} />
            </Box>
        </Box>
    );
}
