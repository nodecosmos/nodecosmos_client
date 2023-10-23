import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useWorkflowStepsVirtualizer from '../../../hooks/diagram/useWorkflowStepsVirtualizer';
import { selectWorkflowDiagram } from '../../../workflows.selectors';
import WorkflowStep from './WorkflowStep';

export default function WorkflowSteps({ workflowId }) {
    const workflowDiagram = useSelector(selectWorkflowDiagram(workflowId));
    const visibleWorkflowSteps = useWorkflowStepsVirtualizer(workflowId);

    return visibleWorkflowSteps.map((wfStep, index) => (
        <WorkflowStep
            key={wfStep.diagramId}
            wfStep={wfStep}
            wfStepIndex={
                workflowDiagram.workflowSteps.findIndex((step) => step.diagramId === wfStep.diagramId)
            }
        />
    ));
}

WorkflowSteps.propTypes = {
    workflowId: PropTypes.string.isRequired,
};
