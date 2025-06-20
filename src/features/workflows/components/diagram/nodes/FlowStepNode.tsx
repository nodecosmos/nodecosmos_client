import FlowStepNodeButton from './FlowStepNodeButton';
import NodeOutputsBranch from './NodeOutputsBranch';
import { FlowStepNode as FlowStepNodeType, Output as OutputType } from '../../../diagram/diagram.types';
import { useFlowStepNodeContextCreator } from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import Inputs from '../ios/Inputs';
import Output from '../ios/Output';
import React from 'react';

interface Props {
    flowStepNode: FlowStepNodeType,
}

export default function FlowStepNode({ flowStepNode }: Props) {
    const {
        FlowStepNodeContext,
        flowStepContextValue,
    } = useFlowStepNodeContextCreator({
        id: flowStepNode.id,
        flowStepNode,
    });

    return (
        <FlowStepNodeContext.Provider value={flowStepContextValue}>
            <NodeOutputsBranch />
            <Inputs />
            <FlowStepNodeButton />
            {
                flowStepNode.outputs.map((output: OutputType) => (
                    <Output key={output.id} output={output} />
                ))
            }
        </FlowStepNodeContext.Provider>
    );
}
