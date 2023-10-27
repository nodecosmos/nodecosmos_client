import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { UUID } from '../../../../types';
import { WorkflowDiagram } from '../../diagram/types';
import { selectWorkflowDiagram } from '../../workflows.selectors';
import { selectTransformablePositionAttribute } from '../../../app/app.selectors';
import useWorkflowContext from '../useWorkflowContext';

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

    const { transformableId, scale } = useWorkflowContext();

    const diagram: WorkflowDiagram = useSelector(selectWorkflowDiagram(id));
    const clientHeight = useSelector(selectTransformablePositionAttribute(transformableId, 'clientHeight'));
    let height = diagram.height > clientHeight ? diagram.height : clientHeight;

    if (scale < 1) {
        height = height * (1 / scale);
    }

    return useMemo(() => ({
        ...diagram,
        height,
    }), [diagram, height]);
}
