import React from 'react';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import Input from './Input';

export default function Inputs() {
    const { inputIds } = useFlowStepNodeContext();

    return (
        inputIds.map((id) => (
            <Input prevStepOutputId={id} key={id} />
        ))
    );
}
