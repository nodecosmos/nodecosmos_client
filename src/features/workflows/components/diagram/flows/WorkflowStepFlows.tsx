import WorkflowStepFlow from './WorkflowStepFlow';
import useWorkflowStepContext from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';
import React from 'react';

export default function WorkflowStepFlows() {
    const { wfStep, wfStepIndex } = useWorkflowStepContext();

    return wfStep.flows.map((workflowStepFlow) => {
        return (
            <WorkflowStepFlow
                key={workflowStepFlow.id}
                workflowStepFlow={workflowStepFlow}
                flowStepIndex={wfStepIndex + 1} />
        );
    });
}
