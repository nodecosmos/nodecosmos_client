import usePrevious from '../../../../common/hooks/usePrevious';
import { NodecosmosTheme } from '../../../../themes/type';
import { UUID } from '../../../../types';
import useNodeContext from '../../hooks/tree/useNodeContext';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    MARGIN_LEFT,
    MARGIN_TOP,
    TRANSITION_ANIMATION_DURATION,
} from '../../nodes.constants';
import { selectNodeAttribute } from '../../nodes.selectors';
import { useTheme } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function NestedNodesBranch() {
    const theme: NodecosmosTheme = useTheme();

    const {
        treeBranchId,
        lastChildId,
        isExpanded,
        y,
        xEnd,
    } = useNodeContext();

    const lastChildY = useSelector(selectNodeAttribute(treeBranchId, lastChildId as UUID, 'y'));
    const prevPathYEnd = usePrevious(lastChildY);

    const x = xEnd + MARGIN_LEFT;
    const linkY = y + MARGIN_TOP;
    const yEnd = lastChildY || prevPathYEnd;

    if (!lastChildId || !isExpanded || !yEnd) return null;

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
