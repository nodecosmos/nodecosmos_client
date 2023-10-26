import React from 'react';
import { WorkflowStep as WorkflowStepType } from '../../../diagram/types';
import useDiagramContext from '../../../hooks/diagram/useDiagramContext';
import WorkflowStep from './WorkflowStep';

export default function WorkflowSteps() {
    const diagram = useDiagramContext();

    return diagram.workflowSteps.map((wfStep: WorkflowStepType) => (
        <WorkflowStep key={wfStep.index} wfStep={wfStep} />
    ));
}
