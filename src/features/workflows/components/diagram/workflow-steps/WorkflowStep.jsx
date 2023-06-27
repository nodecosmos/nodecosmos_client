import React from 'react';
import {
  Box, Button, Typography, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectTransformablePositionsById } from '../../../../app/app.selectors';
import { TRANSFORMABLE_HEIGHT_MARGIN } from '../../../../app/constants';
import FlowModal from '../../../../flows/components/FlowModal';
import { SHADOW_OFFSET, WORKFLOW_STEP_HEIGHT, WORKFLOW_STEP_WIDTH } from '../../../workflows.constants';
import { selectWorkflowDiagramPosition } from '../../../workflows.selectors';
import WorkflowStepFlows from './WorkflowStepFlows';

export default function WorkflowStep({ wfStep, wfStepIndex }) {
  const theme = useTheme();
  const [hovered, setHovered] = React.useState(false);

  const { clientHeight } = useSelector(selectTransformablePositionsById('workflow')) || 0;
  const [openCreateFlowModal, setOpenCreateFlowModal] = React.useState(false);
  const { x } = useSelector(selectWorkflowDiagramPosition(wfStep.diagramId));
  const { yEnd: workflowDiagramYEnd } = useSelector(selectWorkflowDiagramPosition(wfStep.workflowId));

  const wfStepHeight = Math.max(clientHeight || 0, workflowDiagramYEnd || 0) - TRANSFORMABLE_HEIGHT_MARGIN;
  if (!wfStepHeight || !x) return null;

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      key={wfStep.diagramId}
    >
      <path
        strokeWidth={1}
        d={`M ${x} 0
            L ${x} ${wfStepHeight}`}
        stroke={theme.palette.workflow.default}
        fill="transparent"
      />
      <rect
        onMouseEnter={() => setHovered(true)}
        x={x}
        y={SHADOW_OFFSET}
        height={wfStepHeight}
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
        x={x}
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
            variant="body2"
            fontFamily="'Roboto', sans-serif"
            color="text.secondary"
          >
            {wfStepIndex + 1}
          </Typography>
          {hovered && (
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            disableElevation
            type="submit"
            sx={{ ml: 2, borderRadius: 1 }}
            onClick={() => setOpenCreateFlowModal(true)}
          >
            Add Flow
          </Button>
          )}
        </Box>
        <FlowModal
          workflowId={wfStep.workflowId}
          open={openCreateFlowModal}
          startIndex={wfStepIndex}
          onClose={() => setOpenCreateFlowModal(false)}
        />
      </foreignObject>

      <WorkflowStepFlows wfStep={wfStep} wfStepHovered={hovered} wfStepIndex={wfStepIndex} />
    </g>
  );
}

WorkflowStep.propTypes = {
  wfStep: PropTypes.object.isRequired,
  wfStepIndex: PropTypes.number.isRequired,
};
