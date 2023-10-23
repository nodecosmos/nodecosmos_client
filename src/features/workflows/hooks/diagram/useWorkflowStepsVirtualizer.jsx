import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectTransformablePositionAttribute } from '../../../app/app.selectors';
import { CLIENT_VIEWPORT_BUFFER_FACTOR } from '../../../trees/trees.constants';
import {
    selectWorkflowDiagram,
    selectWorkflowDiagramPositionById,
    selectWorkflowScale,
} from '../../workflows.selectors';
import useWorkflowContext from '../useWorkflowContext';

export default function useWorkflowStepsVirtualizer() {
    const { id, transformableId } = useWorkflowContext();
    const workflowDiagram = useSelector(selectWorkflowDiagram(id));
    const scrollLeft = useSelector(selectTransformablePositionAttribute(transformableId, 'scrollLeft'));
    const clientWidth = useSelector(selectTransformablePositionAttribute(transformableId, 'clientWidth'));
    const positionsById = useSelector(selectWorkflowDiagramPositionById);
    const wfScale = useSelector(selectWorkflowScale);

    const lastWorkflowStepDiagramId = useMemo(() => {
        if (!workflowDiagram?.workflowSteps) return null;

        return workflowDiagram.workflowSteps[workflowDiagram.workflowSteps.length - 1].diagramId;
    }, [workflowDiagram?.workflowSteps]);

    const isInsideViewport = useCallback((currentWfStepDiagramId) => {
        const { x } = positionsById[currentWfStepDiagramId] || {};
        if (!x) return false;

        const effectiveScrollLeft = scrollLeft / wfScale;
        const effectiveClientWidth = clientWidth / wfScale;

        const leftBoundary = effectiveScrollLeft - effectiveClientWidth * CLIENT_VIEWPORT_BUFFER_FACTOR;
        const rightBoundary = effectiveScrollLeft + effectiveClientWidth * CLIENT_VIEWPORT_BUFFER_FACTOR;

        if (currentWfStepDiagramId === lastWorkflowStepDiagramId) return true;

        return x > leftBoundary && x < rightBoundary;
    }, [positionsById, lastWorkflowStepDiagramId, scrollLeft, clientWidth, wfScale]);

    return useMemo(() => {
        if (!workflowDiagram) return [];

        return workflowDiagram.workflowSteps.filter((wfStep) => isInsideViewport(wfStep.diagramId));
    }, [workflowDiagram, isInsideViewport]);
}
