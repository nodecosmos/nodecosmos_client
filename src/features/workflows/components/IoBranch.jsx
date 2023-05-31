import React, { memo } from 'react';
import { useTheme } from '@mui/material';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
/* nodecosmos */
import {
  INITIAL_ANIMATION_DELAY, INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION,
} from '../../trees/trees.constants';
import { MARGIN_LEFT, MARGIN_TOP } from '../workflows.constants';
import { selectWorkflowDiagramPosition } from '../workflows.selectors';

export default function IoBranch({ diagramId }) {
  const {
    x, xEnd, y, yEnd,
  } = useSelector(selectWorkflowDiagramPosition(diagramId));

  const branchX = xEnd + MARGIN_LEFT;
  const branchY = y + MARGIN_TOP;
  const theme = useTheme();

  if (y === yEnd) return null;

  return (
    <path
      stroke={theme.palette.tree.default}
      fill="transparent"
      strokeWidth={3.5}
      d={`M ${branchX} ${branchY} L ${branchX} ${yEnd}`}
      style={{
        opacity: 0,
        animation: `node-path-appear ${INITIAL_ANIMATION_DURATION}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
        transition: `d ${TRANSITION_ANIMATION_DURATION / 2}ms`,
      }}
    />
  );
}

IoBranch.propTypes = {
  diagramId: PropTypes.string.isRequired,
};
