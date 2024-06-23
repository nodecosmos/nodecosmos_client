import { NodecosmosTheme } from '../../../../../../themes/themes.types';
import { UUID } from '../../../../../../types';
import { withOpacity } from '../../../../../../utils/colors';
import { INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION } from '../../../../../nodes/nodes.constants';
import { FLOW_TOOLBAR_HEIGHT } from '../../../../constants';
import useFlowStepContext from '../../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowStepNodeContext from '../../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useDiagramContext from '../../../../hooks/diagram/useDiagramContext';
import useFlowStepNodeColors from '../../../../hooks/diagram/useFlowStepNodeColors';
import useWorkflowBranch from '../../../../hooks/useWorkflowBranch';
import { useTheme } from '@mui/material';
import React from 'react';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

interface InputProps {
    nodeOutputId: UUID
}

const X_ORIGIN_OFFSET = 105;
export const X_DEST_OFFSET = 40;
const Y_ORIGIN_OFFSET = 32.5;

export default function LoopInputLink({ nodeOutputId }: InputProps) {
    const theme: NodecosmosTheme = useTheme();
    const {
        position: destNodePos, isSelected, flowStepId, id: nodeId,
    } = useFlowStepNodeContext();
    const { outputsById } = useDiagramContext();
    const { defaultLoopInputColor } = theme.palette.workflow;
    const { nestedTreeColor } = useFlowStepNodeColors();
    let color = isSelected ? nestedTreeColor.fg : defaultLoopInputColor;
    const strokeColor = defaultLoopInputColor;
    const { isFlowStepInputCreated, isFlowStepInputDeleted } = useWorkflowBranch();
    let strokeWidth = 1.5;

    if (isFlowStepInputCreated(flowStepId, nodeId, nodeOutputId)) {
        strokeWidth = isSelected ? 2 : 1.5;
        color = withOpacity(theme.palette.diff.added.fg, 0.6);
    } else if (isFlowStepInputDeleted(flowStepId, nodeId, nodeOutputId)) {
        strokeWidth = isSelected ? 2 : 1.5;
        color = withOpacity(theme.palette.diff.removed.fg, 0.6);
    }

    let { y: flowStepY } = useFlowStepContext();

    flowStepY += FLOW_TOOLBAR_HEIGHT;

    if (!outputsById[nodeOutputId]) {
        return null;
    }

    const { position: originOutputPosition, nodePosition: originNodePosition } = outputsById[nodeOutputId];
    // current input starts where origin output ends (xEnd, yEnd)
    const { xEnd: x, yEnd: y } = originOutputPosition || {};
    // current input ends where destination node starts (x, y)
    const { x: xEnd, y: yEnd } = destNodePos;

    if (!originNodePosition) {
        return null;
    }

    const selectedOffset = isSelected ? 1 : 0;

    const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;
    const isDestBelow = flowStepY < originNodePosition.y;
    const yOriginOffset = isDestBelow ? Y_ORIGIN_OFFSET : -Y_ORIGIN_OFFSET;

    return (
        <g>
            <path
                className="InputLink"
                stroke={color}
                fill="transparent"
                strokeWidth={strokeWidth}
                d={`M ${x - selectedOffset} ${y - selectedOffset}
                    L ${x + X_ORIGIN_OFFSET - selectedOffset} ${y - yOriginOffset}
                    L ${x + X_ORIGIN_OFFSET - selectedOffset} ${flowStepY + selectedOffset}
                    L ${destNodePos.x - X_DEST_OFFSET + selectedOffset} ${flowStepY + selectedOffset}
                    L ${destNodePos.x - X_DEST_OFFSET + selectedOffset} ${yEnd}
                    L ${xEnd} ${yEnd}`}
                style={{ transition: `d ${transitionAnimationDuration / 2}ms` }}
            />
            <circle
                className="InputLink"
                cx={destNodePos.x - X_DEST_OFFSET}
                cy={flowStepY}
                r={5}
                strokeWidth={1}
                stroke={strokeColor}
                fill={color}
                style={{
                    opacity: 0,
                    animation: `appear ${INITIAL_ANIMATION_DURATION / 2}ms forwards`,
                    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
                }} />
            ;
            <text
                className="InputLinkText"
                x={destNodePos.x - 50}
                y={flowStepY - 9}
                fill={color}
                fontSize="bigger"
            >
                loop
            </text>
            <circle
                className="InputLink"
                cx={x}
                cy={y}
                r={5}
                strokeWidth={2}
                stroke={color}
                fill={color}
                style={{
                    opacity: 0,
                    animation: `appear ${INITIAL_ANIMATION_DURATION / 2}ms forwards`,
                    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
                }}
            />
        </g>
    );
}
