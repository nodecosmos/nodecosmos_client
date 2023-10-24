import React from 'react';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { WorkflowStep } from '../../../types';
import WorkflowStepComponent from './WorkflowStep';

export default function WorkflowSteps() {
    const { diagram } = useWorkflowContext();
    // const visibleWorkflowSteps = useWorkflowStepsVirtualizer(workflowId);

    return diagram.workflowSteps.map((wfStep: WorkflowStep) => (
        <WorkflowStepComponent key={wfStep.index} wfStep={wfStep} />
    ));
}
