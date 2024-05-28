import { useTransformableContext } from '../../../../common/hooks/useTransformableContext';
import { UUID } from '../../../../types';
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
    const { branchId, scale } = useWorkflowContext();
    const {
        initialInputs,
        workflowSteps,
        outputsById,
        height: diagramHeight,
    } = useSelector(selectWorkflowDiagram(branchId, nodeId));
    const { clientHeight } = useTransformableContext();
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
