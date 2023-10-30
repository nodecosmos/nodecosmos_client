import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import usePaneResizable from '../../../common/hooks/usePaneResizable';
import NodePane from '../../../features/nodes/components/pane/NodePane';
import Tree from '../../../features/trees/components/Tree';
import { TREES_TYPES } from '../../../features/trees/trees.constants';
import { Box, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ContributionRequestTree() {
    const { id } = useParams();
    const theme = useTheme();

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
            hoverResizer();
        }
    }, [hoverResizer, resizeInProgress]);

    return (
        <Box
            display={{ xs: 'block', md: 'flex' }}
            width={1}
            height={1}
            overflow="hidden"
            style={{
                cursor: resizeInProgress ? 'col-resize' : 'auto',
            }}
        >
            <Box
                ref={paneARef}
                width={paneAWidth}
                height={1}
                display="flex"
            >
                <Tree rootNodeId={id} type={TREES_TYPES.contributionRequest} />
                <Box
                    onMouseDown={handleResize}
                    width="4px"
                    backgroundColor="transparent"
                    height={1}
                    ml={-0.5}
                    borderRight={1}
                    borderColor="transparent"
                    onMouseEnter={hoverResizer}
                    onMouseLeave={leaveResizer}
                    sx={{
                        position: 'relative',
                        '&:hover': {
                            cursor: 'col-resize',
                        },
                    }}
                />
            </Box>
            <Box
                backgroundColor="background.5"
                ref={paneBRef}
                height={1}
                width={paneBWidth}
                overflow="hidden"
                boxShadow="left.2"
                borderLeft={1}
                style={{
                    borderLeftColor: resizerHovered ? theme.palette.borders['5'] : theme.palette.borders['3'],
                }}
            >
                <NodePane />
            </Box>
        </Box>
    );
}
