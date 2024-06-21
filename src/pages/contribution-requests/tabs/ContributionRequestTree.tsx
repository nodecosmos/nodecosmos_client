import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import usePaneResizable from '../../../common/hooks/usePaneResizable';
import Pane, { PanePage } from '../../../features/app/components/pane/Pane';
import { MOBILE_NO_HEIGHT } from '../../../features/app/constants';
import useIsMobile from '../../../features/app/hooks/useIsMobile';
import { selectBranch } from '../../../features/branch/branches.selectors';
import useBranchContext from '../../../features/branch/hooks/useBranchContext';
import Tree from '../../../features/nodes/components/tree/Tree';
import { TreeType } from '../../../features/nodes/nodes.types';
import { NodecosmosTheme } from '../../../themes/themes.types';
import { Box, useTheme } from '@mui/material';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import { useSelector } from 'react-redux';

const CR_TREE_WIDTH = 'contribution-request-tree';
const CR_NODE_PANE_WIDTH = 'contribution-request-node-pane';

export default function ContributionRequestTree() {
    const theme: NodecosmosTheme = useTheme();
    const { nodeId, branchId } = useBranchContext();
    const branch = useSelector(selectBranch(branchId));
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
        initialWidthA: localStorage.getItem(CR_TREE_WIDTH) || '50%',
        initialWidthB: localStorage.getItem(CR_NODE_PANE_WIDTH) || '50%',
    });
    useEffect(() => {
        if (isMobile) return;

        localStorage.setItem(CR_TREE_WIDTH, paneAWidth);
        localStorage.setItem(CR_NODE_PANE_WIDTH, paneBWidth);
    }, [isMobile, paneAWidth, paneBWidth]);

    useEffect(() => {
        if (!resizeInProgress) {
            leaveResizer();
        }
    }, [resizeInProgress, leaveResizer]);

    const resizerStyle = useMemo(() => (
        { borderLeftColor: resizerHovered ? theme.palette.borders['5'] : theme.palette.borders['3'] }
    ), [resizerHovered, theme.palette.borders]);

    const onResizerLeave = useCallback(() => {
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
                <div
                    className="Resizer"
                    onMouseDown={handleResize}
                    onMouseEnter={hoverResizer}
                    onMouseLeave={onResizerLeave}
                />
            </Box>
            <Box
                ref={paneBRef}
                height={MOBILE_NO_HEIGHT}
                width={paneBWidth}
                overflow="hidden"
                boxShadow="left.2"
                borderLeft={1}
                style={resizerStyle}>
                <Pane rootId={rootId} page={PanePage.Tree} />
            </Box>
        </Box>
    );
}
