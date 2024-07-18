import useBooleanStateValue from '../../common/hooks/useBooleanStateValue';
import usePaneResizable from '../../common/hooks/usePaneResizable';
import { setHeaderContent } from '../../features/app/appSlice';
import Pane, { PanePage } from '../../features/app/components/pane/Pane';
import { MD_FLEX_SX, MOBILE_NO_HEIGHT_SX } from '../../features/app/constants';
import useIsMobile from '../../features/app/hooks/useIsMobile';
import useBranchContext from '../../features/branch/hooks/useBranchContext';
import Tree from '../../features/nodes/components/tree/Tree';
import { selectNode } from '../../features/nodes/nodes.selectors';
import { NodecosmosDispatch } from '../../store';
import { NodecosmosTheme } from '../../themes/themes.types';
import { Box, useTheme } from '@mui/material';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TREE_WIDTH = 'treeWidth';
const NODE_PANE_WIDTH = 'nodePaneWidth';

export default function TreeShow() {
    const { branchId, nodeId: id } = useBranchContext();
    const dispatch: NodecosmosDispatch = useDispatch();
    const theme: NodecosmosTheme = useTheme();
    const paneARef = React.useRef(null);
    const paneBRef = React.useRef(null);
    const [resizerHovered, hoverResizer, leaveResizer] = useBooleanStateValue();
    const isMobile = useIsMobile();
    const {
        paneAWidth,
        paneBWidth,
        handleResize,
        resizeInProgress,
    } = usePaneResizable({
        aRef: paneARef,
        bRef: paneBRef,
        initialWidthA: localStorage.getItem(TREE_WIDTH) || '50%',
        initialWidthB: localStorage.getItem(NODE_PANE_WIDTH) || '50%',
    });

    useEffect(() => {
        if (isMobile) return;

        localStorage.setItem(TREE_WIDTH, paneAWidth);
        localStorage.setItem(NODE_PANE_WIDTH, paneBWidth);
    }, [isMobile, paneAWidth, paneBWidth]);

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

    const resizerStyle = useMemo(() => (
        { borderLeftColor: resizerHovered ? theme.palette.borders['5'] : theme.palette.borders['3'] }
    ), [resizerHovered, theme.palette.borders]);

    if (!id) {
        throw new Error('No id provided');
    }

    // this is not root id of the current tree, but root_id of complete project
    const { rootId: nodeRootId } = useSelector(selectNode(branchId, id));
    const style = useMemo(() => ({ cursor: resizeInProgress ? 'col-resize' : 'inherit' }), [resizeInProgress]);

    return (
        <Box
            display={MD_FLEX_SX}
            width={1}
            height={1}
            overflow="hidden"
            style={style}
        >
            <Box
                ref={paneARef}
                width={paneAWidth}
                height={1}
                display="flex"
            >
                <Tree branchId={branchId} rootId={id} />
                <div
                    className="Resizer"
                    onMouseDown={handleResize}
                    onMouseEnter={hoverResizer}
                    onMouseLeave={onResizerLeave}
                />
            </Box>
            <Box
                ref={paneBRef}
                height={MOBILE_NO_HEIGHT_SX}
                width={paneBWidth}
                overflow="hidden"
                boxShadow="left.2"
                borderLeft={1}
                style={resizerStyle}
            >
                <Pane rootId={nodeRootId} page={PanePage.Tree} />
            </Box>
        </Box>
    );
}
