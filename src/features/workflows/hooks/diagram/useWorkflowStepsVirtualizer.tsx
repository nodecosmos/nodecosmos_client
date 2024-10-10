import useDiagramContext from './useDiagramContext';
import { useTransformableContext } from '../../../../common/hooks/useTransformableContext';
import { Position } from '../../../../types';
import { CLIENT_VIEWPORT_BUFFER_FACTOR } from '../../../nodes/nodes.constants';
import { WorkflowStep } from '../../diagram/diagram.types';
import { selectWorkflowScale } from '../../workflow.selectors';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

type VisibleWorkflowSteps = WorkflowStep[];

export default function useWorkflowStepsVirtualizer(): VisibleWorkflowSteps {
    const diagram = useDiagramContext();
    const { scrollLeft, clientWidth } = useTransformableContext();
    const wfScale = useSelector(selectWorkflowScale);

    const isInsideViewport = useCallback((x: Position['x']) => {
        if (!x) return false;

        const effectiveScrollLeft = scrollLeft / wfScale;
        const effectiveClientWidth = clientWidth / wfScale;

        const leftBoundary = effectiveScrollLeft - effectiveClientWidth * CLIENT_VIEWPORT_BUFFER_FACTOR;
        const rightBoundary = effectiveScrollLeft + effectiveClientWidth * CLIENT_VIEWPORT_BUFFER_FACTOR;

        return (x > leftBoundary) && (x < rightBoundary);
    }, [clientWidth, scrollLeft, wfScale]);

    return useMemo(() => {
        if (!diagram) return [];

        if (diagram.workflowSteps.length < 10) {
            return diagram.workflowSteps;
        }

        return diagram.workflowSteps.filter((step: WorkflowStep, index: number) => {
            const x = step.position.x || 0;
            const isLast = index === diagram.workflowSteps.length - 1;

            return step.hasLoop || isLast || isInsideViewport(x);
        });
    }, [diagram, isInsideViewport]);
}
