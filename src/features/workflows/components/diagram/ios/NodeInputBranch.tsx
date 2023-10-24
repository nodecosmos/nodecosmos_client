import React from 'react';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION } from '../../../../trees/trees.constants';
import { selectSelectedWorkflowObject } from '../../../workflows.selectors';
import { Output } from '../../../types';
import { NodecosmosTheme } from '../../../../../themes/type';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

interface Props {
    input: Output
}

export default function NodeInputBranch({ input }: Props) {
    const theme: NodecosmosTheme = useTheme();
    const selectedWorkflowObject = useSelector(selectSelectedWorkflowObject);
    const selectedObjectId = selectedWorkflowObject?.id;

    const {
        x, y, xEnd, yEnd, 
    } = input.position;

    const {
        selectedInputColor,
        defaultInputColor,
    } = theme.palette.workflow;

    const isSelected = selectedObjectId === input.nodeId;
    const color = isSelected ? selectedInputColor : defaultInputColor;

    if (!x) return null;

    const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;

    return (
        <g>
            <path
                className="input-branch"
                stroke={color}
                fill="transparent"
                strokeWidth={1}
                d={`M ${x} ${y} L ${xEnd} ${yEnd}`}
                style={{
                    opacity: 0,
                    animation: `appear ${INITIAL_ANIMATION_DURATION * 5}ms`,
                    transition: `d ${TRANSITION_ANIMATION_DURATION / 2}ms`,
                }}
            />
            <circle
                cx={x}
                cy={y}
                r={5}
                strokeWidth={1}
                stroke={theme.palette.secondary.main}
                fill={defaultInputColor}
                style={{
                    opacity: 0,
                    animation: `node-circle-appear ${INITIAL_ANIMATION_DURATION / 2}ms`,
                    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
                }}
            />
        </g>
    );
}
