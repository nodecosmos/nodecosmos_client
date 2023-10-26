import React from 'react';
import { FlowStepNode as FlowStepNodeType, Output as OutputType } from '../../../diagram/types';
import Inputs from '../ios/Inputs';
import Output from '../ios/Output';
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
            <Inputs />
            <WorkflowNodeButton />
            {
                flowStepNode.outputs.map((output: OutputType) => (
                    <Output key={output.id} output={output} />
                ))
            }
        </FlowStepNodeContext.Provider>
    );
}
