import React from 'react';
import useWorkflowStepContext from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';
import WorkflowStepFlow from './WorkflowStepFlow';

export default function WorkflowStepFlows() {
  const { wfStep } = useWorkflowStepContext();

  return wfStep.wfStepFlows.map((wfStepFlow, index) => (
    <WorkflowStepFlow
      key={wfStepFlow.diagramId}
      wfStepFlow={wfStepFlow}
      index={index}
    />
  ));
}
