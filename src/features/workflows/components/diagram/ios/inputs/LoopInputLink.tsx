import { NodecosmosTheme } from '../../../../../../themes/themes.types';
import { UUID } from '../../../../../../types';
import { withOpacity } from '../../../../../../utils/colors';
import useFlowStepContext from '../../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowStepNodeContext from '../../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useDiagramContext from '../../../../hooks/diagram/useDiagramContext';
import useFlowStepNodeColors from '../../../../hooks/diagram/useFlowStepNodeColors';
import useWorkflowBranch from '../../../../hooks/useWorkflowBranch';
import {
    ANIMATION_PATH_STYLE, CIRCLE_STYLE, FLOW_TOOLBAR_HEIGHT,
} from '../../../../workflows.constants';
import { useTheme } from '@mui/material';
import React from 'react';

interface InputProps {
    nodeOutputId: UUID
}

const X_ORIGIN_OFFSET = 40;
export const X_DEST_OFFSET = 40;

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

    return (
        <g>
            <path
                className="InputLink"
                stroke={color}
                fill="none"
                strokeWidth={strokeWidth}
                d={`M ${x - selectedOffset} ${y - selectedOffset}
                    L ${x + X_ORIGIN_OFFSET - selectedOffset} ${y}
                    L ${x + X_ORIGIN_OFFSET - selectedOffset} ${flowStepY + selectedOffset}
                    L ${destNodePos.x - X_DEST_OFFSET + selectedOffset} ${flowStepY + selectedOffset}
                    L ${destNodePos.x - X_DEST_OFFSET + selectedOffset} ${yEnd}
                    L ${xEnd} ${yEnd}`}
                style={ANIMATION_PATH_STYLE}
            />
            <circle
                className="InputLink"
                cx={destNodePos.x - X_DEST_OFFSET}
                cy={flowStepY}
                r={5}
                strokeWidth={1}
                stroke={strokeColor}
                fill={color}
                style={CIRCLE_STYLE} />
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
                style={CIRCLE_STYLE}
            />
        </g>
    );
}
