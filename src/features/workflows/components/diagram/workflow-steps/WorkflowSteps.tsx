import React from 'react';
import useWorkflowStepsVirtualizer from '../../../hooks/diagram/useWorkflowStepsVirtualizer';
import { WorkflowStep } from '../../../diagram/types';
import WorkflowStepComponent from './WorkflowStep';

export default function WorkflowSteps() {
    const visibleWorkflowSteps = useWorkflowStepsVirtualizer();

    return visibleWorkflowSteps.map((wfStep: WorkflowStep) => (
        <WorkflowStepComponent key={wfStep.index} wfStep={wfStep} />
    ));
}
