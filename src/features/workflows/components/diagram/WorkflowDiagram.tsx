import React from 'react';
import { useSelector } from 'react-redux';
import Transformable from '../../../../common/components/Transformable';
import useWorkflowContext from '../../hooks/useWorkflowContext';
import { selectWorkflowScale } from '../../workflows.selectors';
import WorkflowSteps from './workflow-steps/WorkflowSteps';
import StartStep from './StartStep';

export default function WorkflowDiagram() {
    const { transformableId, diagram } = useWorkflowContext();
    const wfScale = useSelector(selectWorkflowScale);

    if (!diagram) return null;

    return (
        <Transformable
            transformableId={transformableId}
            scale={wfScale}
            heightMargin={-19}
        >
            <g>
                <StartStep />
                <WorkflowSteps />
            </g>
        </Transformable>
    );
}
