import NodeAncestorChain from './NodeAncestorChain';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useNodeColors from '../../../hooks/node/useNodeColors';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import {
    ANIMATION_DELAY, EDGE_LENGTH, INITIAL_ANIMATION_DURATION, MARGIN_LEFT, TRANSITION_ANIMATION_DURATION,
} from '../../../nodes.constants';
import { useTheme } from '@mui/material';
import React, { useMemo } from 'react';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const PATH_ANIMATION = {
    opacity: 0,
    animation: `appear ${INITIAL_ANIMATION_DURATION}ms ${ANIMATION_DELAY}ms forwards`,
    transition: `d ${TRANSITION_ANIMATION_DURATION}ms`,
};

const CIRCLE_ANIMATION = {
    opacity: 0,
    animation: `node-circle-appear ${INITIAL_ANIMATION_DURATION}ms ${ANIMATION_DELAY}ms forwards`,
    transition: `cx ${TRANSITION_ANIMATION_DURATION}ms, cy ${TRANSITION_ANIMATION_DURATION}ms`,
};

export default function NodeBranch() {
    const theme: NodecosmosTheme = useTheme();
    const { size, showAncestorChain } = useTreeContext();
    const {
        isRoot, x, xEnd, y, isSelected,
    } = useNodeContext();
    const { parentColor } = useNodeColors();
    const animated = !isSafari;

    const pathStyle = useMemo(() => {
        if (!animated) return undefined;

        return PATH_ANIMATION;
    }, [animated]);

    const circleStyle = useMemo(() => {
        if (!animated) return undefined;

        return CIRCLE_ANIMATION;
    }, [animated]);

    const pathD = useMemo(() => {
        if (!x) { return null; }

        const pathX = showAncestorChain && isSelected ? size.edgeLength * 2 + MARGIN_LEFT : x;

        return `M ${pathX} ${y}
                C ${pathX} ${y}
                  ${pathX + EDGE_LENGTH / 2} ${y + 1}
                  ${xEnd} ${y}
                L ${xEnd} ${y}`;
    }, [isSelected, showAncestorChain, size.edgeLength, x, xEnd, y]);

    const rootPathD = useMemo(() => {
        return `M ${x + 4} ${y} L ${xEnd} ${y}`;
    }, [x, xEnd, y]);

    if (!x || !pathD) { return null; }

    if (isRoot) {
        return (
            <g>
                <circle cx={x} cy={y} r={5} fill={parentColor} />
                <path strokeWidth={3} d={rootPathD} stroke={theme.palette.tree.default} />
            </g>
        );
    }

    return (
        <g>
            <path
                strokeWidth={size.pathWidth}
                d={pathD}
                stroke={theme.palette.tree.default}
                fill="transparent"
                style={pathStyle}
            />
            <circle
                cx={x}
                cy={y}
                r={size.circleRadius}
                fill={theme.palette.tree.default}
                stroke={parentColor}
                strokeWidth={0.5}
                style={circleStyle}
            />
            <NodeAncestorChain />
        </g>
    );
}
