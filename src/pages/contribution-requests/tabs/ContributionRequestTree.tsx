import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import usePaneResizable from '../../../common/hooks/usePaneResizable';
import NodePane from '../../../features/nodes/components/pane/NodePane';
import Tree from '../../../features/nodes/components/tree/Tree';
import { TreeType } from '../../../features/nodes/nodes.types';
import { NodecosmosTheme } from '../../../themes/type';
import { UUID } from '../../../types';
import { Box, useTheme } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ContributionRequestTree() {
    const { id } = useParams();
    const theme: NodecosmosTheme = useTheme();

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

    useEffect(() => {
        localStorage.setItem('treeWidth', paneAWidth);
        localStorage.setItem('nodePaneWidth', paneBWidth);
    }, [paneAWidth, paneBWidth]);

    useEffect(() => {
        if (!resizeInProgress) {
            leaveResizer();
        }
    }, [resizeInProgress, leaveResizer]);

    const onResizerLeave = useCallback(() => {
        if (!resizeInProgress) {
            leaveResizer();
        }
    }, [resizeInProgress, leaveResizer]);

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
                    treeBranchId={id as UUID}
                    rootNodeId={id as UUID}
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
