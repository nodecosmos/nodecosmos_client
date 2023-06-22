import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectFlowAttribute } from '../../../../flows/flows.selectors';
import { FLOW_STEP_SIZE, WORKFLOW_STEP_WIDTH } from '../../../workflows.constants';
import { selectWorkflowDiagramPosition } from '../../../workflows.selectors';
import FlowStep from '../flow-step/FlowStep';
import FlowStepToolbar from '../flow-step/FlowStepToolbar';

export default function WorkflowStepFlow({ wfStepFlow, wfStepHovered }) {
  const flowTitle = useSelector(selectFlowAttribute(wfStepFlow.workflowId, wfStepFlow.id, 'title'));

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
            component="a"
            fontSize={18.75}
            variant="body1"
            fontFamily="'Roboto', sans-serif"
            fontWeight={700}
            color="text.tertiary"
            textAlign="left"
            sx={{
              maxWidth: 230,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap', // otherwise safari will break two or more words into multiple lines
              '&:hover': {
                cursor: 'pointer',
                textDecoration: 'underline',
                color: 'text.link',
              },
            }}
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
