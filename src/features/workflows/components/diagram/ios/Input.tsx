import DefaultInputLink from './inputs/DefaultInputLink';
import StepOverInputLink from './inputs/StepOverInputLink';
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
        return <StepOverInputLink nodeOutputId={nodeOutputId} />;
    } else {
        return <DefaultInputLink nodeOutputId={nodeOutputId} />;
    }
}
