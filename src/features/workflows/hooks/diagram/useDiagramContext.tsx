import { UUID } from '../../../../types';
import { selectTransformablePositionAttribute } from '../../../app/app.selectors';
import { selectWorkflowDiagram } from '../../workflow.selectors';
import useWorkflowContext from '../useWorkflowContext';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

type DiagramContextType = {
    id: UUID;
};

const DiagramContext = React.createContext<DiagramContextType>({} as DiagramContextType);

export function useDiagramContextCreator({ id }: DiagramContextType) {
    const contextProviderValue = useMemo(() => ({ id }), [id]);

    return {
        DiagramContext,
        contextProviderValue,
    };
}

export default function useDiagramContext() {
    const { id } = React.useContext(DiagramContext);

    const {
        branchId, transformableId, scale,
    } = useWorkflowContext();

    const {
        initialInputs,
        workflowSteps,
        outputsById,
        height: diagramHeight,
    } = useSelector(selectWorkflowDiagram(branchId, id));

    const clientHeight = useSelector(
        selectTransformablePositionAttribute(transformableId, 'clientHeight'),
    ) as number;

    let height = (diagramHeight || 0) > clientHeight ? diagramHeight : clientHeight;

    if (scale < 1) {
        height = height * (1 / scale);
    }

    return useMemo(() => ({
        initialInputs,
        workflowSteps,
        outputsById,
        height,
    }), [initialInputs, workflowSteps, outputsById, height]);
}
