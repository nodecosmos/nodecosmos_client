import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import FlowStepNode from '../nodes/FlowStepNode';
import React from 'react';

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
