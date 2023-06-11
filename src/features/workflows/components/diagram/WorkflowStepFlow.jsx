import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectFlowAttribute } from '../../../flows/flows.selectors';
import { FLOW_STEP_SIZE, WORKFLOW_STEP_WIDTH } from '../../workflows.constants';
import { selectWorkflowDiagramPosition } from '../../workflows.selectors';
import FlowStep from './FlowStep';
import FlowStepToolbar from './FlowStepToolbar';

export default function WorkflowStepFlow({ wfStepFlow, wfStepHovered }) {
  const flowTitle = useSelector(selectFlowAttribute(wfStepFlow.workflowId, wfStepFlow.id, 'title'));
  const flowStartIndex = useSelector(selectFlowAttribute(wfStepFlow.workflowId, wfStepFlow.id, 'startIndex'));

  const { x, y } = useSelector(selectWorkflowDiagramPosition(wfStepFlow.diagramId));

  return (
    <g>
      <foreignObject
        x={x}
        y={y}
        width={WORKFLOW_STEP_WIDTH + 1}
        height={FLOW_STEP_SIZE}
      >
        <Box
          display="flex"
          alignItems="center"
          height={1}
          pl={2}
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
          <FlowStepToolbar wfStepFlow={wfStepFlow} wfStepHovered={wfStepHovered} />
        </Box>

      </foreignObject>
      <FlowStep flowStep={wfStepFlow.flowStep} />
    </g>
  );
}

WorkflowStepFlow.propTypes = {
  wfStepFlow: PropTypes.object.isRequired,
  wfStepHovered: PropTypes.bool.isRequired,
};
