import NodeAncestorChain from './NodeAncestorChain';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useNodeColors from '../../../hooks/node/useNodeColors';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import {
    ANIMATION_DELAY, EDGE_LENGTH, INITIAL_ANIMATION_DURATION, EDGE_MARGIN_LEFT, TRANSITION_ANIMATION_DURATION,
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
    const {
        size, showAncestorChain, showTreeColors, 
    } = useTreeContext();
    const {
        x, xEnd, y, isSelected, isAlreadyMounted, isCurrentRoot,
    } = useNodeContext();
    let { parentColor } = useNodeColors();
    parentColor = showTreeColors ? parentColor : theme.palette.tree.default;
    const animated = !isSafari;

    const pathStyle = useMemo(() => {
        if (!animated) return undefined;

        if (!isCurrentRoot && !isAlreadyMounted) {
            return PATH_ANIMATION;
        }

        return { transition: PATH_ANIMATION.transition };
    }, [animated, isAlreadyMounted, isCurrentRoot]);

    const circleStyle = useMemo(() => {
        if (!animated) return undefined;

        if (!isCurrentRoot && !isAlreadyMounted) {
            return CIRCLE_ANIMATION;
        }

        return { transition: CIRCLE_ANIMATION.transition };
    }, [animated, isCurrentRoot, isAlreadyMounted]);

    const pathD = useMemo(() => {
        if (!x) { return null; }

        const pathX = showAncestorChain && isSelected ? size.edgeLength * 2 + EDGE_MARGIN_LEFT : x;

        return `M ${pathX} ${y}
                C ${pathX} ${y}
                  ${pathX + EDGE_LENGTH / 2} ${y + 1}
                  ${xEnd} ${y}
                L ${xEnd} ${y}`;
    }, [isSelected, showAncestorChain, size.edgeLength, x, xEnd, y]);

    const rootPathD = useMemo(() => {
        return `M ${x + 5} ${y} L ${xEnd} ${y}`;
    }, [x, xEnd, y]);

    if (!x || !pathD) { return null; }

    if (isCurrentRoot) {
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
