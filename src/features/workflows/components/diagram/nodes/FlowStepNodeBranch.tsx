import { NodecosmosTheme } from '../../../../../themes/themes.types';
import {
    EDGE_LENGTH,
    INITIAL_ANIMATION_DURATION,
    TRANSITION_ANIMATION_DURATION,
} from '../../../../nodes/nodes.constants';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import { useTheme } from '@mui/material';
import React from 'react';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default function FlowStepNodeBranch() {
    const theme: NodecosmosTheme = useTheme();
    const { position } = useFlowStepNodeContext();

    const {
        x, xEnd, y,
    } = position;

    if (!x || !xEnd) return null;

    const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;
    const initialAnimationDuration = INITIAL_ANIMATION_DURATION;

    return (
        <g>
            <path
                strokeWidth={3}
                d={`M ${x} ${y} L ${xEnd - EDGE_LENGTH} ${y}`}
                stroke={theme.palette.workflow.default}
                fill="transparent"
                style={{
                    opacity: 0,
                    animation: `appear ${initialAnimationDuration}ms forwards`,
                    transition: `d ${transitionAnimationDuration}ms`,
                }}
            />
            <circle
                cx={x}
                cy={y}
                r={5}
                stroke={theme.palette.secondary.main}
                fill={theme.palette.workflow.default}
                style={{
                    opacity: 0,
                    animation: `node-circle-appear ${initialAnimationDuration / 2}ms forwards`,
                    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
                }}
            />
        </g>
    );
}
