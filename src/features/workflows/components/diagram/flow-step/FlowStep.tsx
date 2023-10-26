import React from 'react';
import FlowStepNode from '../nodes/FlowStepNode';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';

export default function FlowStep() {
    const { flowStepNodes } = useFlowStepContext();
    if (!flowStepNodes) return null;

    return (
        <g>
            {
                flowStepNodes.map((flowStepNode) => (
                    <FlowStepNode key={flowStepNode.id} flowStepNode={flowStepNode} />
                ))
            }
        </g>
    );
}
