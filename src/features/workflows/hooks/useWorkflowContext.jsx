import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkflow } from '../workflows.selectors';

const WorkflowContext = React.createContext(undefined);

export function useWorkflowContextCreator({ context, id, nodeId }) {
  const contextProviderValue = useMemo(() => ({ context, id, nodeId }), [context, id, nodeId]);

  return {
    WorkflowContext,
    contextProviderValue,
  };
}

export default function useWorkflowContext() {
  const { context, id, nodeId } = React.useContext(WorkflowContext);

  if (context === undefined) {
    throw new Error('useWorkflowContext must be used within a WorkflowContext.Provider');
  }

  const { title, flowIds, initialInputIds } = useSelector(selectWorkflow(id));
  const transformableId = `WF_${context}_${id}`;

  return {
    context, id, nodeId, transformableId, title, flowIds, initialInputIds,
  };
}
