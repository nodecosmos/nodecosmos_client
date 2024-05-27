import usePrevious from '../../../../../common/hooks/usePrevious';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    MARGIN_LEFT,
    MARGIN_TOP,
    TRANSITION_ANIMATION_DURATION,
} from '../../../nodes.constants';
import { useTheme } from '@mui/material';
import React, { useMemo } from 'react';

const STYLE = {
    opacity: 0,
    animation: `appear ${INITIAL_ANIMATION_DURATION}ms ${ANIMATION_DELAY}ms forwards`,
    transition: `d ${TRANSITION_ANIMATION_DURATION / 2}ms`,
};

export default function NestedNodesBranch() {
    const theme: NodecosmosTheme = useTheme();
    const { treeNodes } = useTreeContext();
    const {
        lastChildId,
        isExpanded,
        y,
        xEnd,
    } = useNodeContext();

    let lastChildY;
    if (lastChildId) {
        lastChildY = treeNodes[lastChildId].y;
    }
    const prevPathYEnd = usePrevious(lastChildY);
    const x = xEnd + MARGIN_LEFT;
    const linkY = y + MARGIN_TOP;
    const yEnd = lastChildY || prevPathYEnd;
    const pathD = useMemo(() => {
        return `M ${x} ${linkY} L ${x} ${yEnd}`;
    }, [x, linkY, yEnd]);

    if (!lastChildId || !isExpanded || !yEnd) return null;

    return (
        <path
            stroke={theme.palette.tree.default}
            fill="transparent"
            strokeWidth={3.5}
            d={pathD}
            style={STYLE}
        />
    );
}
