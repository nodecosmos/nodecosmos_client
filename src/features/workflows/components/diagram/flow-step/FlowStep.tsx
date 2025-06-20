import Toolbar from './Toolbar';
import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useFlowStepActions from '../../../../flow-steps/hooks/useFlowStepActions';
import useFlowStepColors from '../../../hooks/diagram/flow-step/useFlowStepColors';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import {
    FLOW_TOOLBAR_HEIGHT, HEIGHT_TRANSITION_STYLE, WORKFLOW_STEP_WIDTH,
} from '../../../workflows.constants';
import FlowStepNode from '../nodes/FlowStepNode';
import { useTheme } from '@mui/material';
import React from 'react';

export default function FlowStep() {
    const {
        flowStepNodes, x, y, yEnd, isSelected,
    } = useFlowStepContext();
    const theme: NodecosmosTheme = useTheme();
    const [hovered, hover, unhover] = useBooleanStateValue();
    const { backgroundColor, outlineColor } = useFlowStepColors();
    const { handleFlowStepClick } = useFlowStepActions({ unhover });

    return (
        <g
            className="cursor-pointer"
            onClick={handleFlowStepClick}
            onMouseEnter={hover}
            onMouseLeave={unhover}
        >
            <rect
                x={x}
                y={y}
                width={WORKFLOW_STEP_WIDTH}
                height={yEnd - y}
                fill={backgroundColor}
                strokeWidth={1}
                stroke={hovered || isSelected ? theme.palette.workflow.selectedFsBorder : outlineColor}
                style={HEIGHT_TRANSITION_STYLE}
            />
            <foreignObject
                x={x + 0.5}
                y={y + 0.5}
                width={WORKFLOW_STEP_WIDTH - 1}
                height={FLOW_TOOLBAR_HEIGHT - 1}
            >
                <Toolbar />
            </foreignObject>
            <g>
                {
                    flowStepNodes && flowStepNodes.map((flowStepNode) => (
                        <FlowStepNode key={flowStepNode.id} flowStepNode={flowStepNode} />
                    ))
                }
            </g>
        </g>
    );
}
