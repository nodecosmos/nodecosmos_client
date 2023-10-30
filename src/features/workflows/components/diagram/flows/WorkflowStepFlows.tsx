import WorkflowStepFlow from './WorkflowStepFlow';
import useWorkflowStepContext from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';
import React from 'react';

export default function WorkflowStepFlows() {
    const { wfStep } = useWorkflowStepContext();

    return wfStep.flows.map((workflowStepFlow) => (
        <WorkflowStepFlow key={workflowStepFlow.id} workflowStepFlow={workflowStepFlow} />
    ));
}
