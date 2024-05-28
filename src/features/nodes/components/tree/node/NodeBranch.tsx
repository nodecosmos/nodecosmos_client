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

export default function NodeBranch() {
    const theme: NodecosmosTheme = useTheme();
    const { size, showAncestorChain } = useTreeContext();
    const {
        isRoot, x, xEnd, y, isAlreadyMounted, isSelected,
    } = useNodeContext();

    const { parentColor } = useNodeColors();

    const pathStyle = useMemo(() => {
        const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;
        const initialAnimationDuration = isSafari || isAlreadyMounted ? 0 : INITIAL_ANIMATION_DURATION;
        const initialAnimationDelay = isSafari || isAlreadyMounted ? 0 : ANIMATION_DELAY;

        return {
            opacity: 0,
            animation: `appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
            transition: `d ${transitionAnimationDuration}ms`,
        };
    }, [isAlreadyMounted]);

    const circleStyle = useMemo(() => {
        const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;
        const initialAnimationDuration = isSafari || isAlreadyMounted ? 0 : INITIAL_ANIMATION_DURATION;
        const initialAnimationDelay = isSafari || isAlreadyMounted ? 0 : ANIMATION_DELAY;

        return {
            opacity: 0,
            animation: `node-circle-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
            transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
        };
    }, [isAlreadyMounted]);

    const pathD = useMemo(() => {
        const pathX = showAncestorChain && isSelected ? size.edgeLength * 2 + MARGIN_LEFT : x;

        return `M ${pathX} ${y}
                C ${pathX} ${y}
                  ${pathX + EDGE_LENGTH / 2} ${y + 1}
                  ${xEnd} ${y}
                L ${xEnd} ${y}`;
    }, [isSelected, showAncestorChain, size.edgeLength, x, xEnd, y]);

    const rootPathD = useMemo(() => {
        return `M ${x} ${y} L ${xEnd} ${y}`;
    }, [x, xEnd, y]);

    if (!x) { return null; }

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
                style={circleStyle}
            />
            <NodeAncestorChain />
        </g>
    );
}
