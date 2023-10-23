import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setHeaderContent } from '../../features/app/appSlice';
import usePaneResizable from '../../common/hooks/usePaneResizable';
import NodePane from '../../features/nodes/components/pane/NodePane';
import Tree from '../../features/trees/components/Tree';

export default function Show() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();

    const treeWidthFromLocalStorage = localStorage.getItem('treeWidth');
    const nodePaneWidthFromLocalStorage = localStorage.getItem('nodePaneWidth');

    const paneARef = React.useRef(null);
    const paneBRef = React.useRef(null);
    const [resizerHovered, setResizerHovered] = React.useState(false);

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
        dispatch(setHeaderContent('TreeShowHeader'));

        return () => {
            dispatch(setHeaderContent(''));
        };
    }, [dispatch]);

    useEffect(() => {
        if (!resizeInProgress) {
            setResizerHovered(false);
        }
    }, [resizeInProgress]);

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
                <Tree rootNodeId={id} />
                <Box
                    onMouseDown={handleResize}
                    width="4px"
                    backgroundColor="transparent"
                    height={1}
                    ml={-0.5}
                    borderRight={1}
                    borderColor="transparent"
                    onMouseEnter={() => setResizerHovered(true)}
                    onMouseLeave={() => {
                        if (!resizeInProgress) {
                            setResizerHovered(false);
                        }
                    }}
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
