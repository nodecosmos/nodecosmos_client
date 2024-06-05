import { NodecosmosTheme } from '../../../../../themes/themes.types';
import {
    ANIMATION_DELAY, INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION,
} from '../../../../nodes/nodes.constants';
import {
    EDGE_LENGTH, OUTPUT_BUTTON_WIDTH, OUTPUT_VERTICAL_EDGE_LENGTH,
} from '../../../constants';
import { Output as OutputType } from '../../../diagram/diagram.types';
import { useTheme } from '@mui/material';
import React from 'react';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

interface OutputProps {
    output: OutputType;
}

export default function OutputBranch(props: OutputProps) {
    const theme: NodecosmosTheme = useTheme();

    const { output } = props;
    const { x, y } = output.position;
    if (!x) { return null; }

    const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;
    const initialAnimationDuration = INITIAL_ANIMATION_DURATION;
    const animationDelay = ANIMATION_DELAY;
    const xEnd = x + OUTPUT_VERTICAL_EDGE_LENGTH;
    const existingX = x + EDGE_LENGTH + OUTPUT_BUTTON_WIDTH - 1;
    return (
        <g>
            <path
                strokeWidth={3}
                d={`M ${x} ${y}
                    L ${x + EDGE_LENGTH} ${y}`}
                stroke={theme.palette.workflow.default}
                fill="transparent"
                style={{
                    opacity: 0,
                    animation: `appear ${initialAnimationDuration}ms ${animationDelay}ms forwards`,
                    transition: `d ${transitionAnimationDuration}ms`,
                }}
            />
            <circle
                cx={x + 0.5}
                cy={y - 0.5}
                r={5}
                fill={theme.palette.workflow.default}
                style={{
                    opacity: 0,
                    animation: `appear ${initialAnimationDuration / 2}ms ${animationDelay}ms forwards`,
                    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
                }}
            />
            <path
                strokeWidth={3}
                d={`M ${existingX} ${y}
                    L ${existingX + EDGE_LENGTH} ${y}`}
                stroke={theme.palette.workflow.default}
                fill="transparent"
                style={{
                    opacity: 0,
                    animation: `appear ${initialAnimationDuration}ms ${animationDelay}ms forwards`,
                    transition: `d ${transitionAnimationDuration}ms`,
                }}
            />
            <circle
                cx={xEnd}
                cy={y}
                r={5}
                fill={theme.palette.workflow.default}
                style={{
                    opacity: 0,
                    animation: `appear ${initialAnimationDuration / 2}ms ${animationDelay}ms forwards`,
                    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
                }}
            />
        </g>
    );
}
