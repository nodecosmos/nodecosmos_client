import useDiagramContext from './useDiagramContext';
import { Position } from '../../../../types';
import { selectTransformablePositionAttribute } from '../../../app/app.selectors';
import { CLIENT_VIEWPORT_BUFFER_FACTOR } from '../../../nodes/nodes.constants';
import { WorkflowStep } from '../../diagram/types';
import { selectWorkflowScale } from '../../workflow.selectors';
import useWorkflowContext from '../useWorkflowContext';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

type VisibleWorkflowSteps = WorkflowStep[];

export default function useWorkflowStepsVirtualizer(): VisibleWorkflowSteps {
    const { transformableId } = useWorkflowContext();
    const diagram = useDiagramContext();

    const scrollLeft = useSelector(selectTransformablePositionAttribute(transformableId, 'scrollLeft'));
    const clientWidth = useSelector(selectTransformablePositionAttribute(transformableId, 'clientWidth'));
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

        return diagram.workflowSteps.filter((step: WorkflowStep, index: number) => {
            const x = step.position.x || 0;
            const isLast = index === diagram.workflowSteps.length - 1;

            return isLast || isInsideViewport(x);
        });
    }, [diagram, isInsideViewport]);
}
