import React from 'react';
import useWorkflowStepContext from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';
import WorkflowStepFlow from './WorkflowStepFlow';

export default function WorkflowStepFlows() {
    const { wfStep } = useWorkflowStepContext();

    return wfStep.flows.map((workflowStepFlow) => (
        <WorkflowStepFlow key={workflowStepFlow.id} workflowStepFlow={workflowStepFlow} />
    ));
}
