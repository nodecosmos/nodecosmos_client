import React from 'react';
import FlowStepNode from '../nodes/FlowStepNode';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';

export default function FlowStep() {
    const { workflowStepFlow } = useFlowStepContext();
    if (!workflowStepFlow) return null;

    return (
        <g>
            {
                workflowStepFlow.flowStepNodes?.map((flowStepNode) => (
                    <FlowStepNode key={flowStepNode.id} flowStepNode={flowStepNode} />
                ))
            }
        </g>
    );
}
