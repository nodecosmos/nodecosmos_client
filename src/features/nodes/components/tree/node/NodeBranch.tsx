import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useNodeColors from '../../../hooks/node/useNodeColors';
import useNodeContext from '../../../hooks/node/useNodeContext';
import {
    ANIMATION_DELAY, INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION,
} from '../../../nodes.constants';
import { useTheme } from '@mui/material';
import React, { useMemo } from 'react';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default function NodeBranch() {
    const theme: NodecosmosTheme = useTheme();
    const {
        isRoot, x, xEnd, y, isAlreadyMounted,
    } = useNodeContext();

    const { parentBackgroundColor } = useNodeColors();

    const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;
    const initialAnimationDuration = isSafari || isAlreadyMounted ? 0 : INITIAL_ANIMATION_DURATION;
    const initialAnimationDelay = isSafari || isAlreadyMounted ? 0 : ANIMATION_DELAY;

    const pathStyle = useMemo(() => ({
        opacity: 0,
        animation: `appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
        transition: `d ${transitionAnimationDuration}ms`,
    }), [initialAnimationDuration, initialAnimationDelay, transitionAnimationDuration]);

    const circleStyle = useMemo(() => ({
        opacity: 0,
        animation: `node-circle-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
        transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
    }), [initialAnimationDuration, initialAnimationDelay, transitionAnimationDuration]);

    const pathD = useMemo(() => {
        return `M ${x} ${y}
                C ${x} ${y}
                  ${x + 25} ${y + 1}
                  ${xEnd} ${y}
                L ${xEnd} ${y}`;
    }, [x, xEnd, y]);

    const rootPathD = useMemo(() => {
        return `M ${x + 6} ${y} L ${xEnd} ${y}`;
    }, [x, xEnd, y]);

    if (!x) { return null; }

    if (isRoot) {
        return (
            <g>
                <circle cx={x} cy={y} r={6} fill={parentBackgroundColor} />
                <path strokeWidth={4} d={rootPathD} stroke={theme.palette.tree.default} />
            </g>
        );
    }

    return (
        <g>
            <path
                strokeWidth={3.5}
                d={pathD}
                stroke={theme.palette.tree.default}
                fill="transparent"
                style={pathStyle}
            />
            <circle
                cx={x}
                cy={y}
                r={5}
                fill={parentBackgroundColor}
                style={circleStyle}
            />
        </g>
    );
}
