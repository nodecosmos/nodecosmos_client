import { NodecosmosTheme } from '../../../../../../themes/themes.types';
import { UUID } from '../../../../../../types';
import { withOpacity } from '../../../../../../utils/colors';
import { selectSelectedObject } from '../../../../../app/app.selectors';
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
import { useSelector } from 'react-redux';

interface InputProps {
    nodeOutputId: UUID
}

const X_ORIGIN_OFFSET = 40;
export const X_DEST_OFFSET = 40;

export default function StepOverInputLink({ nodeOutputId }: InputProps) {
    const theme: NodecosmosTheme = useTheme();
    const {
        position: destNodePos, isSelected: isNodeSelected, flowStepId, id: nodeId,
    } = useFlowStepNodeContext();
    const { outputsById } = useDiagramContext();
    const { defaultLoopInputColor } = theme.palette.workflow;
    const { nestedTreeColor } = useFlowStepNodeColors();
    const strokeColor = defaultLoopInputColor;
    const { isFlowStepInputCreated, isFlowStepInputDeleted } = useWorkflowBranch();
    const isCreated = isFlowStepInputCreated(flowStepId, nodeId, nodeOutputId);
    const isDeleted = isFlowStepInputDeleted(flowStepId, nodeId, nodeOutputId);
    const selectedObject = useSelector(selectSelectedObject);
    const isOutputSelected = selectedObject?.objectId === nodeOutputId;

    let color = isNodeSelected || isOutputSelected ? nestedTreeColor.fg : defaultLoopInputColor;
    let strokeWidth = 1.5;

    if (isCreated) {
        strokeWidth = isNodeSelected || isOutputSelected ? 2 : 1.5;
        color = withOpacity(theme.palette.diff.added.fg, 0.6);
    } else if (isDeleted) {
        strokeWidth = isNodeSelected || isOutputSelected ? 2 : 1.5;
        color = withOpacity(theme.palette.diff.removed.fg, 0.6);
    }

    let { y: flowStepY } = useFlowStepContext();

    flowStepY += FLOW_TOOLBAR_HEIGHT;

    if (!outputsById[nodeOutputId]) {
        return null;
    }

    const {
        position: originOutputPosition, nodePosition: originNodePosition, startButtonPosition,
    } = outputsById[nodeOutputId];
    // current input starts where origin output ends (xEnd, yEnd)
    const { xEnd: x, yEnd: y } = originOutputPosition || {};
    // current input ends where destination node starts (x, y)
    const { x: xEnd, y: yEnd } = destNodePos;

    if (!originNodePosition && !startButtonPosition) {
        return null;
    }

    const selectedOffset = isNodeSelected || isOutputSelected ? 1 : 0;

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
                cx={destNodePos.x - X_DEST_OFFSET + selectedOffset}
                cy={flowStepY + selectedOffset}
                r={5}
                strokeWidth={1}
                stroke={strokeColor}
                fill={color}
                style={CIRCLE_STYLE} />
            ;
            {
                isDeleted && (
                    <text
                        className="InputLinkText"
                        x={destNodePos.x - 65}
                        y={flowStepY - 9}
                        fill={color}
                        fontSize="bigger"
                    >
                        removed
                    </text>
                )
            }
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
