import React from 'react';
import { useTheme } from '@mui/material';
import {
    ANIMATION_DELAY, INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION,
} from '../../../../trees/trees.constants';
import { OUTPUT_VERTICAL_EDGE_LENGTH } from '../../../workflows.constants';
import { NodecosmosTheme } from '../../../../../themes/type';
import { Output as OutputType } from '../../../diagram/types';

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

    return (
        <g>
            <circle
                cx={x + 0.5}
                cy={y - 0.5}
                r={5}
                fill={theme.palette.workflow.defaultInputColor}
                style={{
                    opacity: 0,
                    animation: `node-circle-appear ${initialAnimationDuration / 2}ms ${animationDelay}ms forwards`,
                    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
                }}
            />
            <path
                strokeWidth={3}
                d={`M ${x + 5.5} ${y}
            C ${x + 5.5} ${y}
              ${x + 25} ${y + 1}
              ${xEnd} ${y}
            L ${xEnd} ${y}`}
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
                    animation: `node-circle-appear ${initialAnimationDuration / 2}ms ${animationDelay}ms forwards`,
                    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
                }}
            />
        </g>
    );
}
