import usePrevious from '../../../../common/hooks/usePrevious';
import useNodeContext, { useNodePosition } from '../../hooks/node/useNodeContext';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    MARGIN_LEFT,
    MARGIN_TOP,
    TRANSITION_ANIMATION_DURATION,
} from '../../trees.constants';
import { selectPosition, selectTreeNodeAttribute } from '../../trees.selectors';
import { useTheme } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
/* nodecosmos */

export default function NestedNodesBranch() {
    const {
        treeNodeId,
        treeRootNodeId,
        isExpanded,
    } = useNodeContext();
    const { xEnd, y } = useNodePosition();

    const treeLastChildId = useSelector(selectTreeNodeAttribute(treeNodeId, 'treeLastChildId'));
    const { y: pathYEnd } = useSelector(selectPosition(treeRootNodeId, treeLastChildId));
    const prevPathYEnd = usePrevious(pathYEnd);

    const theme = useTheme();

    const x = xEnd + MARGIN_LEFT;
    const linkY = y + MARGIN_TOP;
    const yEnd = pathYEnd || prevPathYEnd;

    if (!isExpanded || !treeLastChildId || !yEnd) return null;

    return (
        <path
            stroke={theme.palette.tree.default}
            fill="transparent"
            strokeWidth={3.5}
            d={`M ${x} ${linkY} L ${x} ${yEnd}`}
            style={{
                opacity: 0,
                animation: `appear ${INITIAL_ANIMATION_DURATION}ms ${ANIMATION_DELAY}ms forwards`,
                transition: `d ${TRANSITION_ANIMATION_DURATION / 2}ms`,
            }}
        />
    );
}
