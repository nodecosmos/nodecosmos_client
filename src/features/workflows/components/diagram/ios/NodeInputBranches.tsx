import React from 'react';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import NodeInputBranch from './NodeInputBranch';

export default function NodeInputBranches() {
    const { inputs } = useFlowStepNodeContext();

    return (
        inputs.map((input) => (
            <NodeInputBranch input={input} key={input.id} />
        ))
    );
}
