import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectTransformablePositionAttribute } from '../../../app/app.selectors';
import { CLIENT_VIEWPORT_BUFFER_FACTOR } from '../../../trees/trees.constants';
import { selectWorkflowDiagram, selectWorkflowDiagramPositionById } from '../../workflows.selectors';
import useWorkflowTransformableId from './useWorkflowTransformableId';

export default function useWorkflowStepsVirtualizer(workflowId) {
  const workflowDiagram = useSelector(selectWorkflowDiagram(workflowId));
  const transformableId = useWorkflowTransformableId();

  const scrollLeft = useSelector(selectTransformablePositionAttribute(transformableId, 'scrollLeft'));
  const clientWidth = useSelector(selectTransformablePositionAttribute(transformableId, 'clientWidth'));
  const positionsById = useSelector(selectWorkflowDiagramPositionById);
  const lastWorkflowStepDiagramId = useMemo(() => {
    if (!workflowDiagram?.workflowSteps) return null;

    return workflowDiagram.workflowSteps[workflowDiagram.workflowSteps.length - 1].diagramId;
  }, [workflowDiagram?.workflowSteps]);

  const isInsideViewport = useCallback((currentWfStepDiagramId) => {
    const { x } = positionsById[currentWfStepDiagramId] || {};
    if (!x) return false;

    if (currentWfStepDiagramId === lastWorkflowStepDiagramId) return true;

    return x > scrollLeft - clientWidth * CLIENT_VIEWPORT_BUFFER_FACTOR
      && x < scrollLeft + clientWidth * CLIENT_VIEWPORT_BUFFER_FACTOR;
  }, [positionsById, lastWorkflowStepDiagramId, scrollLeft, clientWidth]);

  return useMemo(() => {
    if (!workflowDiagram) return [];

    return workflowDiagram.workflowSteps.filter((wfStep) => isInsideViewport(wfStep.diagramId));
  }, [workflowDiagram, isInsideViewport]);
}
