import React from 'react';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIOAttribute } from '../inputOutput.selectors';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  TRANSITION_ANIMATION_DURATION,
} from '../../trees/trees.constants';
import { OUTPUT_VERTICAL_EDGE_LENGTH } from '../../workflows/workflows.constants';
import { selectWorkflowDiagramPosition } from '../../workflows/workflows.selectors';

export default function InputPipe({
  id,
  nodeDiagramId,
}) {
  const theme = useTheme();

  const { x, y: yStart } = useSelector(selectWorkflowDiagramPosition(id)); // output of prev step
  const { x: xEnd, y: yEnd } = useSelector(selectWorkflowDiagramPosition(nodeDiagramId));

  const xStart = x + OUTPUT_VERTICAL_EDGE_LENGTH + 5;

  if (!x) return null;

  return (
    <path
      stroke={theme.palette.workflow.input}
      fill="transparent"
      strokeWidth={1}
      d={`M ${xStart} ${yStart} L ${xEnd} ${yEnd}`}
      style={{
        opacity: 0,
        animation: `node-path-appear ${INITIAL_ANIMATION_DURATION * 5}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
        transition: `d ${TRANSITION_ANIMATION_DURATION / 2}ms`,
      }}
    />
  );
}

InputPipe.propTypes = {
  id: PropTypes.string.isRequired,
  nodeDiagramId: PropTypes.string.isRequired,
};
