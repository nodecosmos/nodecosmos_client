import { useContext } from 'react';
import { WorkflowsContext } from '../../workflows.context';

export default function useWorkflowTransformableId() {
  const workflowContext = useContext(WorkflowsContext);

  return `WF_${workflowContext}`;
}
