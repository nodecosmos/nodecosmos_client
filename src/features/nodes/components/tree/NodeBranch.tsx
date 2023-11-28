import { NodecosmosTheme } from '../../../../themes/type';
import useNodeColors from '../../hooks/tree/useNodeColors';
import useNodeContext from '../../hooks/tree/useNodeContext';
import {
    ANIMATION_DELAY, INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION,
} from '../../nodes.constants';
import { useTheme } from '@mui/material';
import React from 'react';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default function NodeBranch() {
    const theme: NodecosmosTheme = useTheme();
    const {
        isRoot, x, xEnd, y, alreadyMounted,
    } = useNodeContext();

    const { parentBackgroundColor } = useNodeColors();

    if (!x) { return null; }

    if (isRoot) {
        return (
            <g>
                <circle cx={x} cy={y} r={6} fill={parentBackgroundColor} />
                <path strokeWidth={4} d={`M ${x + 6} ${y} L ${xEnd} ${y}`} stroke={theme.palette.tree.default} />
            </g>
        );
    }

    const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;
    const initialAnimationDuration = isSafari || alreadyMounted ? 0 : INITIAL_ANIMATION_DURATION;
    const initialAnimationDelay = isSafari || alreadyMounted ? 0 : ANIMATION_DELAY;

    return (
        <g>
            <path
                strokeWidth={3.5}
                d={`M ${x} ${y}
            C ${x} ${y}
              ${x + 25} ${y + 1}
              ${xEnd} ${y}
            L ${xEnd} ${y}`}
                stroke={theme.palette.tree.default}
                fill="transparent"
                style={{
                    opacity: 0,
                    animation: `appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
                    transition: `d ${transitionAnimationDuration}ms`,
                }}
            />
            <circle
                cx={x}
                cy={y}
                r={5}
                fill={parentBackgroundColor}
                style={{
                    opacity: 0,
                    animation: `node-circle-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
                    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
                }}
            />
        </g>
    );
}
