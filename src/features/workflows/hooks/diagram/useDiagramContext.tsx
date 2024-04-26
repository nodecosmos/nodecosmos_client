import { UUID } from '../../../../types';
import { selectTransformablePositionAttribute } from '../../../app/app.selectors';
import { selectWorkflowDiagram } from '../../workflow.selectors';
import useWorkflowContext from '../useWorkflowContext';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

type DiagramContextType = {
    nodeId: UUID;
};

const DiagramContext = React.createContext<DiagramContextType>({} as DiagramContextType);

export function useDiagramContextCreator({ nodeId }: DiagramContextType) {
    const contextProviderValue = useMemo(() => ({ nodeId }), [nodeId]);

    return {
        DiagramContext,
        contextProviderValue,
    };
}

export default function useDiagramContext() {
    const { nodeId } = React.useContext(DiagramContext);

    const {
        branchId, transformableId, scale,
    } = useWorkflowContext();

    const {
        initialInputs,
        workflowSteps,
        outputsById,
        height: diagramHeight,
    } = useSelector(selectWorkflowDiagram(branchId, nodeId));

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
