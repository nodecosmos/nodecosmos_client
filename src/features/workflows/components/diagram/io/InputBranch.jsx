import React from 'react';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  TRANSITION_ANIMATION_DURATION,
} from '../../../../trees/trees.constants';
import { OUTPUT_VERTICAL_EDGE_LENGTH } from '../../../workflows.constants';
import { selectWorkflowDiagramPosition } from '../../../workflows.selectors';

export default function InputBranch({
  id,
  nodeDiagramId,
  index,
}) {
  const theme = useTheme();

  const { x, y: yStart } = useSelector(selectWorkflowDiagramPosition(id)); // output of prev step
  const { x: xEnd, y: yEnd } = useSelector(selectWorkflowDiagramPosition(nodeDiagramId));

  const { inputColors } = theme.palette.workflow;
  const colorCount = inputColors.length;

  const color = inputColors[index % colorCount];

  const xStart = x + OUTPUT_VERTICAL_EDGE_LENGTH + 5;

  if (!x) return null;

  return (
    <g>
      <path
        stroke={color}
        fill="transparent"
        strokeWidth={1}
        d={`M ${xStart} ${yStart} L ${xEnd} ${yEnd}`}
        style={{
          opacity: 0,
          animation: `node-path-appear ${INITIAL_ANIMATION_DURATION * 5}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
          transition: `d ${TRANSITION_ANIMATION_DURATION / 2}ms`,
        }}
      />
    </g>
  );
}

InputBranch.propTypes = {
  id: PropTypes.string.isRequired,
  nodeDiagramId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
