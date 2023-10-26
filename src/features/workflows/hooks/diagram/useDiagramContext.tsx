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

    const { transformableId } = useWorkflowContext();

    const diagram: WorkflowDiagram = useSelector(selectWorkflowDiagram(id));
    const clientHeight = useSelector(selectTransformablePositionAttribute(transformableId, 'clientHeight'));
    const height = diagram.height > clientHeight ? diagram.height : clientHeight;

    return useMemo(() => ({
        ...diagram,
        height,
    }), [diagram, height]);
}
