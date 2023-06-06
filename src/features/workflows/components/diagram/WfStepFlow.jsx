import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectFlowAttribute } from '../../../flows/flows.selectors';
import { FLOW_STEP_SIZE, WORKFLOW_STEP_WIDTH } from '../../workflows.constants';
import { selectWorkflowDiagramPosition } from '../../workflows.selectors';
import FlowStep from './FlowStep';
import FlowStepToolbar from './FlowStepToolbar';

export default function WfStepFlow({ flow, wfStepHovered, wfStepIndex }) {
  const flowTitle = useSelector(selectFlowAttribute(flow.workflowId, flow.id, 'title'));
  const { x, y } = useSelector(selectWorkflowDiagramPosition(flow.diagramId));

  return (
    <foreignObject
      x={x}
      y={y}
      width={WORKFLOW_STEP_WIDTH + 1}
      height={FLOW_STEP_SIZE}
    >
      <Box
        display="flex"
        alignItems="end"
        height={1}
        pl={2}
        pb={1}
        borderBottom={2}
        borderColor="workflow.default"
        color="text.tertiary"
        zIndex={1}
        position="relative"
      >
        <Typography
          fontSize={18.75}
          variant="body1"
          fontFamily="'Roboto', sans-serif"
          fontWeight={700}
          color="text.tertiary"
          textAlign="left"
        >
          {flowTitle}
        </Typography>
        {wfStepHovered && <FlowStepToolbar />}
      </Box>

      {
        flow.flowSteps.map((flowStep, index) => (
          <FlowStep
            wfStepHovered={wfStepHovered}
            key={flowStep.diagramId}
            flowStep={flowStep}
            wfStepIndex={wfStepIndex}
            flowStepIndex={index}
          />
        ))
      }
    </foreignObject>
  );
}

WfStepFlow.propTypes = {
  flow: PropTypes.object.isRequired,
  wfStepHovered: PropTypes.bool.isRequired,
  wfStepIndex: PropTypes.number.isRequired,
};
