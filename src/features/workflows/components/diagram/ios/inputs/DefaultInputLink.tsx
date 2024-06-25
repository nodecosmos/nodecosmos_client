import { NodecosmosTheme } from '../../../../../../themes/themes.types';
import { UUID } from '../../../../../../types';
import { withOpacity } from '../../../../../../utils/colors';
import useFlowStepNodeContext from '../../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useDiagramContext from '../../../../hooks/diagram/useDiagramContext';
import useFlowStepNodeColors from '../../../../hooks/diagram/useFlowStepNodeColors';
import useWorkflowBranch from '../../../../hooks/useWorkflowBranch';
import { CIRCLE_STYLE, PATH_STYLE } from '../../../../workflows.constants';
import { useTheme } from '@mui/material';
import React from 'react';

interface InputProps {
    nodeOutputId: UUID
}

export default function DefaultInputLink({ nodeOutputId }: InputProps) {
    const theme: NodecosmosTheme = useTheme();
    const {
        position: nodePosition, isSelected, flowStepId, id: nodeId,
    } = useFlowStepNodeContext();
    const { outputsById } = useDiagramContext();
    const { nestedTreeColor } = useFlowStepNodeColors();
    const { defaultInputColor, default: defaultWfColor } = theme.palette.workflow;

    let color = isSelected ? nestedTreeColor.fg : defaultInputColor;
    const { isFlowStepInputCreated, isFlowStepInputDeleted } = useWorkflowBranch();
    let strokeWidth = 1;

    if (isFlowStepInputCreated(flowStepId, nodeId, nodeOutputId)) {
        strokeWidth = isSelected ? 2 : 1;
        color = withOpacity(theme.palette.diff.added.fg, 0.4);
    } else if (isFlowStepInputDeleted(flowStepId, nodeId, nodeOutputId)) {
        strokeWidth = isSelected ? 2 : 1;
        color = withOpacity(theme.palette.diff.removed.fg, 0.4);
    }

    const { position: prevOutputPosition } = outputsById[nodeOutputId] || {};

    // current input starts where previous output ends (xEnd, yEnd)
    const { xEnd: x, yEnd: y } = prevOutputPosition || {};

    // current input ends where current node starts (x, y)
    const { x: xEnd, y: yEnd } = nodePosition;

    return (
        <g>
            <path
                className="InputLink"
                stroke={color}
                fill="transparent"
                strokeWidth={strokeWidth}
                d={`M ${x} ${y} L ${xEnd} ${yEnd}`}
                style={PATH_STYLE}
            />
            <circle
                className="InputLink"
                cx={x}
                cy={y}
                r={5}
                strokeWidth={1}
                stroke={color}
                fill={defaultWfColor}
                style={CIRCLE_STYLE}
            />
        </g>
    );
}
