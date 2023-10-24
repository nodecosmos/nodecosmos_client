import React from 'react';
import { FlowStepNode as FlowStepNodeType } from '../../../types';
import NodeInputBranches from '../ios/NodeInputBranches';
import WorkflowOutputButton from '../ios/WorkflowOutputButton';
import { useFlowStepNodeContextCreator } from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import NodeOutputsBranch from './NodeOutputsBranch';
import WorkflowNodeButton from './WorkflowNodeButton';

interface Props {
    flowStepNode: FlowStepNodeType,
}

export default function FlowStepNode({ flowStepNode }: Props) {
    const {
        FlowStepNodeContext,
        flowStepContextValue,
    } = useFlowStepNodeContextCreator({ id: flowStepNode.id, flowStepNode });

    return (
        <FlowStepNodeContext.Provider value={flowStepContextValue}>
            <NodeOutputsBranch />
            <NodeInputBranches />
            <WorkflowNodeButton />
            {
                flowStepNode.outputs.map((output) => (
                    <WorkflowOutputButton key={output.id} output={output} />
                ))
            }
        </FlowStepNodeContext.Provider>
    );
}
