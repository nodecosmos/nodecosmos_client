import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectWorkflowDiagram } from '../workflows.selectors';
import WorkflowStep from './WorkflowStep';

export default function WorkflowSteps({ workflowId }) {
  const workflowDiagram = useSelector(selectWorkflowDiagram(workflowId));

  return workflowDiagram.workflowSteps.map((wfStep, index) => (
    <WorkflowStep wfStep={wfStep} wfStepIndex={index} key={wfStep.diagramId} />
  ));
}

WorkflowSteps.propTypes = {
  workflowId: PropTypes.string.isRequired,
};
