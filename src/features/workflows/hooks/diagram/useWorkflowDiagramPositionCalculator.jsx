import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkflowDiagram } from '../../workflows.selectors';

export default function useWorkflowDiagramPositionCalculator(id) {
  const workflowDiagram = useSelector(selectWorkflowDiagram(id));

  return useMemo(() => {
    if (!workflowDiagram) return {};

    const result = {};

    workflowDiagram.forEach((workflowStep) => {

    });

    return result;
  }, [workflowDiagram]);
}
