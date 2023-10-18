import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkflow, selectWorkflowDiagramPosition, selectWorkflowScale } from '../workflows.selectors';
import { selectTransformablePositionAttribute } from '../../app/app.selectors';

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

  const scale = useSelector(selectWorkflowScale);
  const { title, flowIds, initialInputIds } = useSelector(selectWorkflow(id));
  const transformableId = `WF_${context}_${id}`;

  const clientHeight = useSelector(selectTransformablePositionAttribute(transformableId, 'clientHeight'));
  const { yEnd: workflowDiagramYEnd } = useSelector(selectWorkflowDiagramPosition(id));

  let wfHeight = Math.max(clientHeight || 0, workflowDiagramYEnd || 0) * (1 / scale) - 8;
  wfHeight = Math.max(wfHeight, 0);

  return {
    context,
    id,
    nodeId,
    transformableId,
    title,
    flowIds,
    initialInputIds,
    wfHeight,
  };
}
