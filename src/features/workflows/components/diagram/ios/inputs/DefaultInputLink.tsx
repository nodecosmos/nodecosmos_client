import { NodecosmosTheme } from '../../../../../../themes/type';
import { UUID } from '../../../../../../types';
import { INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION } from '../../../../../nodes/nodes.constants';
import useFlowStepNodeContext from '../../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useDiagramContext from '../../../../hooks/diagram/useDiagramContext';
import { useTheme } from '@mui/material';
import React from 'react';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

interface InputProps {
    nodeOutputId: UUID
}

export default function DefaultInputLink({ nodeOutputId }: InputProps) {
    const theme: NodecosmosTheme = useTheme();
    const { position: nodePosition, isSelected } = useFlowStepNodeContext();
    const { outputsById } = useDiagramContext();
    const {
        selectedInputColor,
        defaultInputColor,
    } = theme.palette.workflow;

    const color = isSelected ? selectedInputColor : defaultInputColor;

    const { position: prevOutputPosition } = outputsById[nodeOutputId] || {};

    // current input starts where previous output ends (xEnd, yEnd)
    const { xEnd: x, yEnd: y } = prevOutputPosition || {};

    // current input ends where current node starts (x, y)
    const { x: xEnd, y: yEnd } = nodePosition;

    const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;

    return (
        <g>
            <path
                className="InputLink"
                stroke={color}
                fill="transparent"
                strokeWidth={1}
                d={`M ${x} ${y} L ${xEnd} ${yEnd}`}
                style={{
                    opacity: 0,
                    animation: `appear ${INITIAL_ANIMATION_DURATION * 5}ms forwards`,
                    transition: `d ${transitionAnimationDuration / 2}ms`,
                }}
            />
            <circle
                className="InputLink"
                cx={x}
                cy={y}
                r={5}
                strokeWidth={1}
                stroke={selectedInputColor}
                fill={color}
                style={{
                    opacity: 0,
                    animation: `node-circle-appear ${INITIAL_ANIMATION_DURATION / 2}ms forwards`,
                    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
                }}
            />
        </g>
    );
}
