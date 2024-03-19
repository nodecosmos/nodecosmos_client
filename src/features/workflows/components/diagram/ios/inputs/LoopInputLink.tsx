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

const LOOP_NODE_OFFSET = -30;
const LOOP_OUTPUT_OFFSET = -30;

export default function LoopInputLink({ nodeOutputId }: InputProps) {
    const theme: NodecosmosTheme = useTheme();
    const { position: nodePosition, isSelected } = useFlowStepNodeContext();
    const { outputsById } = useDiagramContext();

    const {
        selectedLoopInputColor,
        defaultLoopInputColor,
    } = theme.palette.workflow;

    const color = isSelected ? selectedLoopInputColor : defaultLoopInputColor;

    const { position: prevOutputPosition, nodePosition: outputNodePosition } = outputsById[nodeOutputId] || {};

    // current input starts where previous output ends (xEnd, yEnd)
    const { xEnd: x, yEnd: y } = prevOutputPosition || {};

    // current input ends where current node starts (x, y)
    const { x: xEnd, y: yEnd } = nodePosition;

    const loopDestinationNodeY = yEnd + LOOP_NODE_OFFSET;
    const loopOriginY = (prevOutputPosition?.yEnd || 0) + LOOP_OUTPUT_OFFSET || loopDestinationNodeY;
    const loopOriginNodeX = (outputNodePosition && outputNodePosition.x) || xEnd;

    const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;

    return (
        <g>
            <path
                className="InputLink"
                stroke={color}
                fill="transparent"
                strokeWidth={1}
                d={`M ${x} ${y} 
                    L${x} ${loopOriginY}
                    L${loopOriginNodeX} ${loopOriginY}
                    L${loopOriginNodeX} ${loopDestinationNodeY}  
                    L${xEnd} ${loopDestinationNodeY}
                    L ${xEnd} ${yEnd}`}
                style={{
                    opacity: 0,
                    animation: `appear ${INITIAL_ANIMATION_DURATION * 5}ms forwards`,
                    transition: `d ${transitionAnimationDuration / 2}ms`,
                }}
            />
            <text
                className="InputLinkText"
                x={x - 30}
                y={loopOriginY - 5}
                fill={isSelected ? selectedLoopInputColor : defaultLoopInputColor}>
                loop
            </text>
            <circle
                className="InputLink"
                cx={x}
                cy={y}
                r={5}
                strokeWidth={1}
                stroke={isSelected ? selectedLoopInputColor : defaultLoopInputColor}
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
