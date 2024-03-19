import DefaultInputLink from './inputs/DefaultInputLink';
import LoopInputLink from './inputs/LoopInputLink';
import { UUID } from '../../../../../types';
import useWorkflowStepContext from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';
import React from 'react';

interface InputProps {
    nodeOutputId: UUID
}

export default function Input({ nodeOutputId }: InputProps) {
    const { prevStepOutputIds } = useWorkflowStepContext();
    const isLoop = !prevStepOutputIds.has(nodeOutputId);

    if (isLoop) {
        return <LoopInputLink nodeOutputId={nodeOutputId} />;
    } else {
        return <DefaultInputLink nodeOutputId={nodeOutputId} />;
    }
}
