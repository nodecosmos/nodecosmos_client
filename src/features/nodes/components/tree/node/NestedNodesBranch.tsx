import usePrevious from '../../../../../common/hooks/usePrevious';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    EDGE_MARGIN_LEFT,
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

interface NodeAncestorChainProps {
    y: number;
    yEnd: number;
}

function NodeAncestorChain({ y, yEnd }: NodeAncestorChainProps) {
    const { size } = useTreeContext();
    const { xEnd } = useNodeContext();
    const theme: NodecosmosTheme = useTheme();
    const { edgeLength, marginTop } = size;
    const totalEdgeLength = edgeLength + marginTop;

    // for each edgeLength between y and yEnd, render a circle
    const circles = useMemo(
        () => [...Array(Math.round(Math.abs(yEnd - y) / totalEdgeLength))], [totalEdgeLength, y, yEnd],
    );

    return circles.map((_, i) => (<circle
        key={i}
        className="NodeAncestorCircle"
        cx={xEnd + EDGE_MARGIN_LEFT}
        cy={y + (i + 1) * totalEdgeLength}
        stroke={theme.palette.tree.default}
        strokeWidth={1}
        r={size.circleRadius - 1}
        fill={theme.palette.tree.default}
        style={STYLE}
    />));
}

export default function NestedNodesBranch() {
    const theme: NodecosmosTheme = useTheme();
    const {
        treeNodes,
        size,
        showAncestorChain,
    } = useTreeContext();
    const {
        lastChildId,
        isExpanded,
        y,
        xEnd,
    } = useNodeContext();
    let lastChildY = null;

    if (lastChildId) {
        lastChildY = treeNodes[lastChildId].y;
    }
    const prevPathYEnd = usePrevious(lastChildY);
    const yEnd = lastChildY || prevPathYEnd;

    const pathD = useMemo(() => {
        if (!lastChildId || !isExpanded || !lastChildY) return null;

        const x = xEnd + EDGE_MARGIN_LEFT;
        const linkY = y + MARGIN_TOP;

        if (!yEnd) return null;

        return `M ${x} ${linkY} L ${x} ${yEnd}`;
    }, [isExpanded, lastChildId, lastChildY, xEnd, y, yEnd]);

    if (!pathD || !yEnd) return null;

    return (
        <>
            {showAncestorChain && lastChildY && <NodeAncestorChain y={y} yEnd={yEnd} />}
            <path
                stroke={theme.palette.tree.default}
                fill="transparent"
                strokeWidth={size.pathWidth}
                d={pathD}
                style={STYLE}
            />
        </>
    );
}
