import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectWorkflowDiagram } from '../../../workflows.selectors';
import WorkflowStep from './WorkflowStep';

export default function WorkflowSteps({ workflowId }) {
  const workflowDiagram = useSelector(selectWorkflowDiagram(workflowId));

  return workflowDiagram.workflowSteps.map((wfStep, index) => (
    <WorkflowStep key={wfStep.diagramId} wfStep={wfStep} wfStepIndex={index} />
  ));
}

WorkflowSteps.propTypes = {
  workflowId: PropTypes.string.isRequired,
};
