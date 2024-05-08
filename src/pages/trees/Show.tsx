import useBooleanStateValue from '../../common/hooks/useBooleanStateValue';
import usePaneResizable from '../../common/hooks/usePaneResizable';
import { setHeaderContent } from '../../features/app/appSlice';
import Pane, { PanePage } from '../../features/app/components/pane/Pane';
import useBranchContext from '../../features/branch/hooks/useBranchContext';
import Tree from '../../features/nodes/components/tree/Tree';
import { selectNode } from '../../features/nodes/nodes.selectors';
import { NodecosmosDispatch } from '../../store';
import { NodecosmosTheme } from '../../themes/type';
import { UUID } from '../../types';
import { Box, useTheme } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Show() {
    const { id } = useParams<{id: UUID}>();
    const { branchId } = useBranchContext();
    const dispatch: NodecosmosDispatch = useDispatch();
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
        dispatch(setHeaderContent('TreeShowHeader'));

        return () => {
            dispatch(setHeaderContent(''));
        };
    }, [dispatch]);

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

    if (!id) {
        throw new Error('No id provided');
    }

    // this is not root id of the current tree, but root_id of complete project
    const { rootId: nodeRootId } = useSelector(selectNode(branchId, id));

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
                <Tree branchId={branchId} rootId={id} />
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
                style={{ borderLeftColor: resizerHovered ? theme.palette.borders['4'] : theme.palette.borders['2'] }}
            >
                <Pane rootId={nodeRootId} page={PanePage.Tree} />
            </Box>
        </Box>
    );
}
