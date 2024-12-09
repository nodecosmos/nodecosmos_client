import { NodecosmosTheme } from '../../../../../../themes/themes.types';
import { UUID } from '../../../../../../types';
import { withOpacity } from '../../../../../../utils/colors';
import { selectSelectedObject } from '../../../../../app/app.selectors';
import { maybeSelectNode } from '../../../../../nodes/nodes.selectors';
import useFlowStepNodeContext from '../../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useDiagramContext from '../../../../hooks/diagram/useDiagramContext';
import useFlowStepNodeColors from '../../../../hooks/diagram/useFlowStepNodeColors';
import useWorkflowBranch from '../../../../hooks/useWorkflowBranch';
import { CIRCLE_STYLE, PATH_STYLE } from '../../../../workflows.constants';
import { useTheme } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

interface InputProps {
    nodeOutputId: UUID
}

export default function DefaultInputLink({ nodeOutputId }: InputProps) {
    const theme: NodecosmosTheme = useTheme();
    const {
        branchId,
        position: nodePosition, isSelected: isNodeSelected, flowStepId, id: nodeId,
    } = useFlowStepNodeContext();
    const { outputsById } = useDiagramContext();
    const { nestedTreeColor } = useFlowStepNodeColors();
    const { defaultInputColor, default: defaultWfColor } = theme.palette.workflow;
    const selectedObject = useSelector(selectSelectedObject);
    const isOutputSelected = selectedObject?.objectId === nodeOutputId;
    const outputNode = useSelector(maybeSelectNode(branchId, selectedObject?.metadata?.flowStepNodeId || undefined));

    let color = isOutputSelected || isNodeSelected ? nestedTreeColor.fg : defaultInputColor;

    let outputNodeColor;

    if (outputNode) {
        const { backgrounds } = theme.palette.tree;
        const backgroundCount = backgrounds.length;
        outputNodeColor = backgrounds[(outputNode?.ancestorIds?.length || 0) % backgroundCount];
    }

    if (isOutputSelected && outputNodeColor) {
        color = outputNodeColor.fg;
    }

    const { isFlowStepInputCreated, isFlowStepInputDeleted } = useWorkflowBranch();
    let strokeWidth = 1;

    if (isFlowStepInputCreated(flowStepId, nodeId, nodeOutputId)) {
        strokeWidth = isNodeSelected || isOutputSelected ? 2 : 1;
        color = withOpacity(theme.palette.diff.added.fg, 0.4);
    } else if (isFlowStepInputDeleted(flowStepId, nodeId, nodeOutputId)) {
        strokeWidth = isNodeSelected || isOutputSelected ? 2 : 1;
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
