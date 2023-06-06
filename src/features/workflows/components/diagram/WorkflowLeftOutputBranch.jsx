import React from 'react';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  INITIAL_ANIMATION_DELAY, INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION,
} from '../../../trees/trees.constants';
import { selectWorkflowDiagramPosition } from '../../workflows.selectors';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default function WorkflowLeftOutputBranch(props) {
  const { id } = props;

  const theme = useTheme();

  const { x, xEnd, y } = useSelector(selectWorkflowDiagramPosition(id));

  if (!x) { return null; }

  const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;
  const initialAnimationDuration = INITIAL_ANIMATION_DURATION;
  const initialAnimationDelay = INITIAL_ANIMATION_DELAY;

  return (
    <g>
      <path
        strokeWidth={3.5}
        d={`M ${x} ${y}
            C ${x} ${y}
              ${x + 25} ${y + 1}
              ${xEnd} ${y}
            L ${xEnd} ${y}`}
        stroke={theme.palette.tree.default}
        fill="transparent"
        style={{
          opacity: 0,
          animation: `node-path-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
          transition: `d ${transitionAnimationDuration}ms`,
        }}
      />
      <circle
        cx={x}
        cy={y}
        r={5}
        fill={theme.palette.tree.default}
        style={{
          opacity: 0,
          animation: `node-circle-appear ${initialAnimationDuration / 2}ms ${initialAnimationDelay}ms forwards`,
          transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
        }}
      />
    </g>
  );
}

WorkflowLeftOutputBranch.propTypes = {
  id: PropTypes.string.isRequired,
};
