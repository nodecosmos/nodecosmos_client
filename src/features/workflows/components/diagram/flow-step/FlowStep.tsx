import FlowStepToolbar from './FlowStepToolbar';
import { FLOW_TOOLBAR_HEIGHT, WORKFLOW_STEP_WIDTH } from '../../../constants';
import useFlowStepColors from '../../../hooks/diagram/flow-step/useFlowStepColors';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import FlowStepNode from '../nodes/FlowStepNode';
import { Box } from '@mui/material';
import React from 'react';

export default function FlowStep() {
    const {
        flowStepNodes, x, y, yEnd,
    } = useFlowStepContext();
    const { backgroundColor, outlineColor } = useFlowStepColors();

    return (
        <g>
            <rect
                x={x}
                y={y + FLOW_TOOLBAR_HEIGHT}
                width={WORKFLOW_STEP_WIDTH}
                height={yEnd - y}
                fill={backgroundColor} />
            <foreignObject
                x={x}
                y={y}
                width={WORKFLOW_STEP_WIDTH + 1}
                height={FLOW_TOOLBAR_HEIGHT}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    height="calc(100% - 0px)"
                    borderTop={1}
                    borderBottom={1}
                    borderColor={outlineColor}
                    color="text.tertiary"
                    zIndex={1}
                    position="relative"
                >
                    <FlowStepToolbar />
                </Box>

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
