import React from 'react';
import {
  Box, Button, Typography, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectTransformablePositionAttribute } from '../../../../app/app.selectors';
import FlowModal from '../../../../flows/components/FlowModal';
import { WORKFLOW_STEP_HEIGHT, WORKFLOW_STEP_WIDTH } from '../../../workflows.constants';
import { selectWorkflowDiagramPosition, selectWorkflowScale } from '../../../workflows.selectors';
import useWorkflowTransformableId from '../../../hooks/diagram/useWorkflowTransformableId';
import WorkflowStepFlows from './WorkflowStepFlows';

export default function WorkflowStep({ wfStep, wfStepIndex }) {
  const theme = useTheme();
  const [hovered, setHovered] = React.useState(false);

  const transformableId = useWorkflowTransformableId();
  const clientHeight = useSelector(selectTransformablePositionAttribute(transformableId, 'clientHeight'));
  const [openCreateFlowModal, setOpenCreateFlowModal] = React.useState(false);
  const { x } = useSelector(selectWorkflowDiagramPosition(wfStep.diagramId));
  const { yEnd: workflowDiagramYEnd } = useSelector(selectWorkflowDiagramPosition(wfStep.workflowId));
  const scale = useSelector(selectWorkflowScale);

  const wfStepHeight = Math.max(clientHeight || 0, workflowDiagramYEnd || 0) * (1 / scale) - 8;
  const rectHeight = wfStepHeight && wfStepHeight > 0 ? wfStepHeight : 0;

  const fillColor = wfStepIndex % 2 === 0 ? theme.palette.background[3] : theme.palette.background[2];

  if (!x) return null;

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      key={wfStep.diagramId}
    >
      <path
        strokeWidth={1}
        d={`M ${x} ${0}
            L ${x} ${rectHeight - 2}`}
        stroke={theme.palette.borders[1]}
        fill="transparent"
      />
      <rect
        onMouseEnter={() => setHovered(true)}
        x={x + 1}
        y={0}
        height={rectHeight}
        width={WORKFLOW_STEP_WIDTH - 2}
        fill={fillColor}
        stroke={hovered ? theme.palette.borders[4]
          : 'transparent'}
        strokeWidth={1}
      />
      <foreignObject
        width={WORKFLOW_STEP_WIDTH}
        height={WORKFLOW_STEP_HEIGHT}
        x={x}
        y="0"
      >
        <Box
          display="flex"
          height={1}
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
