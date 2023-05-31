import React from 'react';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIOAttribute } from '../../input-outputs/inputOutput.selectors';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  TRANSITION_ANIMATION_DURATION,
} from '../../trees/trees.constants';
import { selectWorkflowDiagramPosition } from '../workflows.selectors';

export default function InputBranch({
  outputDiagramId,
  nodeDiagramId,
  outputId,
}) {
  const theme = useTheme();

  const { x, y: yStart } = useSelector(selectWorkflowDiagramPosition(outputDiagramId));
  const { x: xEnd, y: yEnd } = useSelector(selectWorkflowDiagramPosition(nodeDiagramId));

  const title = useSelector(selectIOAttribute(outputId, 'title'));
  const xStart = x + title.length * 23.9;

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

InputBranch.propTypes = {
  outputDiagramId: PropTypes.string.isRequired,
  nodeDiagramId: PropTypes.string.isRequired,
  outputId: PropTypes.string.isRequired,
};
