import React, { useContext, useMemo } from 'react';

const WorkflowStepContext = React.createContext(undefined);

export function useWorkflowStepContextCreator({ wfStep, wfStepIndex, hovered }) {
  const contextProviderValue = useMemo(() => ({ wfStep, wfStepIndex, hovered }), [hovered, wfStep, wfStepIndex]);

  return {
    WorkflowStepContext,
    contextProviderValue,
  };
}

export default function useWorkflowStepContext() {
  const { wfStep, wfStepIndex, hovered } = useContext(WorkflowStepContext);

  return { wfStep, wfStepIndex, hovered };
}
