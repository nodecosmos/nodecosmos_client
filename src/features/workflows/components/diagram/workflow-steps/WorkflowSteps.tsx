import WorkflowStep from './WorkflowStep';
import { WorkflowStep as WorkflowStepType } from '../../../diagram/types';
import useDiagramContext from '../../../hooks/diagram/useDiagramContext';
import React from 'react';

export default function WorkflowSteps() {
    const diagram = useDiagramContext();

    return diagram.workflowSteps.map((wfStep: WorkflowStepType) => (
        <WorkflowStep key={wfStep.index} wfStep={wfStep} />
    ));
}
