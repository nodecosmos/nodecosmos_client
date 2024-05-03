import { NodecosmosTheme } from '../../../../../../themes/type';
import { UUID } from '../../../../../../types';
import { INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION } from '../../../../../nodes/nodes.constants';
import useFlowStepNodeContext from '../../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useDiagramContext from '../../../../hooks/diagram/useDiagramContext';
import useFlowStepNodeColors from '../../../../hooks/diagram/useFlowStepNodeColors';
import { useTheme } from '@mui/material';
import React from 'react';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

interface InputProps {
    nodeOutputId: UUID
}

const ORIGIN_NODE_Y_OFFSET = 30;
const DEST_NODE_X_OFFSET = 20;

export default function LoopInputLink({ nodeOutputId }: InputProps) {
    const theme: NodecosmosTheme = useTheme();
    const { position: destNodePos, isSelected } = useFlowStepNodeContext();
    const { outputsById } = useDiagramContext();
    const {
        selectedLoopInputColor,
        defaultLoopInputColor,
    } = theme.palette.workflow;
    const { nestedTreeColor } = useFlowStepNodeColors();
    const color = isSelected ? nestedTreeColor : defaultLoopInputColor;
    const { position: originOutputPosition, nodePosition: originNodePosition } = outputsById[nodeOutputId];
    // current input starts where origin output ends (xEnd, yEnd)
    const { xEnd: x, yEnd: y } = originOutputPosition || {};
    // current input ends where destination node starts (x, y)
    const { x: xEnd, y: yEnd } = destNodePos;

    if (!originNodePosition) {
        return null;
    }

    const originNodeY = originNodePosition.y - ORIGIN_NODE_Y_OFFSET;

    const destNodeXOffset = destNodePos.x - DEST_NODE_X_OFFSET;

    const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;

    return (
        <g>
            <path
                className="InputLink"
                stroke={color}
                fill="transparent"
                strokeWidth={2}
                d={`M ${x} ${y}
                    L ${x} ${originNodeY}
                    L ${destNodeXOffset} ${originNodeY}
                    L ${destNodeXOffset} ${yEnd}
                    L ${xEnd} ${yEnd}`}
                style={{
                    opacity: 0,
                    animation: `appear ${INITIAL_ANIMATION_DURATION * 5}ms forwards`,
                    transition: `d ${transitionAnimationDuration / 2}ms`,
                }}
            />
            {/*<text*/}
            {/*    className="InputLinkText"*/}
            {/*    x={x - 30}*/}
            {/*    y={loopOriginY - 5}*/}
            {/*    fill={isSelected ? backgroundColor : defaultLoopInputColor}>*/}
            {/*    loop*/}
            {/*</text>*/}
            <circle
                className="InputLink"
                cx={x}
                cy={y}
                r={5}
                strokeWidth={2}
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
