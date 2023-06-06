import React from 'react';
import PropTypes from 'prop-types';
import WfStepFlow from './WfStepFlow';

export default function WfStepFlows({ wfStep, wfStepHovered }) {
  return wfStep.flowIds.map((id) => (
    <WfStepFlow
      workflowId={wfStep.workflowId}
      id={id}
      wfStepHovered={wfStepHovered}
    />
  ));
}

WfStepFlows.propTypes = {
  wfStep: PropTypes.object.isRequired,
  wfStepHovered: PropTypes.bool.isRequired,
};
