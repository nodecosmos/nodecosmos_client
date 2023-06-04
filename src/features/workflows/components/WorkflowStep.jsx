import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectTransformablePositionsById } from '../../app/app.selectors';
import { SHADOW_OFFSET, WORKFLOW_STEP_HEIGHT, WORKFLOW_STEP_WIDTH } from '../workflows.constants';
import { selectWorkflowDiagramPosition } from '../workflows.selectors';
import FlowStep from './FlowStep';
import WorkflowStepToolbar from './WorkflowStepToolbar';

export default function WorkflowStep({ wfStep, wfStepIndex }) {
  const theme = useTheme();
  const [hovered, setHovered] = React.useState(false);

  const { clientHeight } = useSelector(selectTransformablePositionsById('workflow'));

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      key={wfStep.diagramId}
    >
      <path
        strokeWidth={1}
        d={`M ${WORKFLOW_STEP_WIDTH * (wfStepIndex + 1)} 0
            L ${WORKFLOW_STEP_WIDTH * (wfStepIndex + 1)} 
              ${clientHeight + 1000}`}
        stroke={theme.palette.workflow.default}
        fill="transparent"
      />
      <rect
        onMouseEnter={() => setHovered(true)}
        x={WORKFLOW_STEP_WIDTH * (wfStepIndex + 1)}
        y={SHADOW_OFFSET}
        height={clientHeight + 1000}
        width={WORKFLOW_STEP_WIDTH}
        fill="transparent"
        stroke={hovered ? theme.palette.workflow.default
          : 'transparent'}
        strokeWidth={3}
      />
      <foreignObject
        className="NodeName"
        width={WORKFLOW_STEP_WIDTH}
        height={WORKFLOW_STEP_HEIGHT}
        x={WORKFLOW_STEP_WIDTH * (wfStepIndex + 1)}
        y="0"
      >
        <Box
          display="flex"
          height={1}
          borderBottom={1}
          borderColor="workflow.default"
          alignItems="center"
          pl={2}
        >
          <Typography
            variant="body1"
            fontFamily="'Roboto', sans-serif"
            fontWeight={700}
            color="text.secondary"
          >
            Step
            {' '}
            {wfStepIndex + 1}
          </Typography>
          {hovered && <WorkflowStepToolbar />}
        </Box>
      </foreignObject>

      {
        wfStep.flowSteps.map((flowStep, index) => (
          <FlowStep
            key={flowStep.diagramId}
            flowStep={flowStep}
            wfStepIndex={wfStepIndex}
            flowStepIndex={index}
          />
        ))
      }
    </g>
  );
}

WorkflowStep.propTypes = {
  wfStep: PropTypes.object.isRequired,
  wfStepIndex: PropTypes.number.isRequired,
};
