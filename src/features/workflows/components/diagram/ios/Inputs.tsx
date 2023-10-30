import Input from './Input';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import React from 'react';

export default function Inputs() {
    const { inputIds } = useFlowStepNodeContext();

    return (
        inputIds.map((id) => (
            <Input prevStepOutputId={id} key={id} />
        ))
    );
}
