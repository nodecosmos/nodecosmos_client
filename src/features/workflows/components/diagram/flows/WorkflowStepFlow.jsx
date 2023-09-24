import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectFlowAttribute } from '../../../../flows/flows.selectors';
import {
  FLOW_STEP_SIZE,
  WORKFLOW_DIAGRAM_CONTEXT,
  WORKFLOW_DIAGRAM_OBJECTS,
  WORKFLOW_STEP_WIDTH,
} from '../../../workflows.constants';
import { WorkflowsContext } from '../../../workflows.context';
import { selectWorkflowDiagramPosition } from '../../../workflows.selectors';
import { setSelectedWorkflowDiagramObject } from '../../../workflowsSlice';
import FlowStep from '../flow-step/FlowStep';
import FlowStepToolbar from '../flow-step/FlowStepToolbar';

export default function WorkflowStepFlow({ wfStepFlow, wfStepHovered, wfStepIndex: _ }) {
  const flowTitle = useSelector(selectFlowAttribute(wfStepFlow.workflowId, wfStepFlow.id, 'title'));
  // const flowStartIndex = useSelector(selectFlowAttribute(wfStepFlow.workflowId, wfStepFlow.id, 'startIndex'));

  const { x, y } = useSelector(selectWorkflowDiagramPosition(wfStepFlow.diagramId));

  const dispatch = useDispatch();
  const workflowContext = useContext(WorkflowsContext);

  const handleFlowClick = () => {
    if (workflowContext === WORKFLOW_DIAGRAM_CONTEXT.workflowPage) {
      dispatch(setSelectedWorkflowDiagramObject({
        id: wfStepFlow.id,
        diagramId: wfStepFlow.id,
        workflowId: wfStepFlow.workflowId,
        type: WORKFLOW_DIAGRAM_OBJECTS.flow,
      }));
    }
  };

  if (!wfStepFlow.shouldRender) return null;

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
          height="calc(100% - 3px)"
          pl={2}
          borderTop={1}
          borderBottom={1}
          borderColor="borders.1"
          color="text.tertiary"
          zIndex={1}
          position="relative"
        >
          <Typography
            onClick={handleFlowClick}
            variant="body1"
            fontWeight={600}
            color="text.tertiary"
            sx={{
              maxWidth: 220,
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
  wfStepIndex: PropTypes.number.isRequired,
};
