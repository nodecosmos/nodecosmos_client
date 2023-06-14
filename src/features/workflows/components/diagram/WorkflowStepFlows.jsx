import React from 'react';
import PropTypes from 'prop-types';
import WorkflowStepFlow from './WorkflowStepFlow';

export default function WorkflowStepFlows({ wfStep, wfStepHovered, wfStepIndex }) {
  return wfStep.wfStepFlows.map((wfStepFlow) => (
    <WorkflowStepFlow
      key={wfStepFlow.diagramId}
      wfStepFlow={wfStepFlow}
      wfStepHovered={wfStepHovered}
      wfStepIndex={wfStepIndex}
    />
  ));
}

WorkflowStepFlows.propTypes = {
  wfStep: PropTypes.object.isRequired,
  wfStepHovered: PropTypes.bool.isRequired,
  wfStepIndex: PropTypes.number.isRequired,
};
