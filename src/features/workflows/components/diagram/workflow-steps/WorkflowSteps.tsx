import WorkflowStep from './WorkflowStep';
import { WorkflowStep as WorkflowStepType } from '../../../diagram/diagram.types';
import useWorkflowStepsVirtualizer from '../../../hooks/diagram/useWorkflowStepsVirtualizer';
import React from 'react';

export default function WorkflowSteps() {
    const workflowSteps = useWorkflowStepsVirtualizer();

    return workflowSteps.map((wfStep: WorkflowStepType) => (
        <WorkflowStep key={wfStep.index} index={wfStep.index} />
    ));
}
