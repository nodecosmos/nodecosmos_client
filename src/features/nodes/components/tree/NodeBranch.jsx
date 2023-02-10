import React from 'react';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodeButtonBackground from '../../hooks/tree/useNodeButtonBackground';
import { selectNodePositionById } from '../../nodes.selectors';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  TRANSITION_ANIMATION_DURATION,
} from './constants';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default function NodeBranch(props) {
  const {
    id,
    nestedLevel,
    isRoot,
  } = props;

  const theme = useTheme();

  const { x, xEnds, y } = useSelector(selectNodePositionById(id));
  const { parentBackgroundColor } = useNodeButtonBackground({ id, nestedLevel, isRoot });

  if (!x) { return null; }

  if (isRoot) {
    return (
      <g>
        <circle cx={x} cy={y} r={6} fill={parentBackgroundColor} />
        <path strokeWidth={4} d={`M ${x} ${y} L ${xEnds} ${y}`} stroke={theme.palette.tree.default} />
      </g>
    );
  }

  const animationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;

  return (
    <g>
      <path
        strokeWidth={3.5}
        d={`M ${x} ${y}
            C ${x} ${y}
              ${x + 25} ${y + 1}
              ${xEnds} ${y}
            L ${xEnds} ${y}`}
        stroke={theme.palette.tree.default}
        fill="transparent"
        style={{
          opacity: 0,
          animation: `node-path-appear ${INITIAL_ANIMATION_DURATION}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
          transition: `d ${animationDuration}ms`,
        }}
      />
      <circle
        cx={x}
        cy={y}
        r={5}
        fill={parentBackgroundColor}
        style={{
          opacity: 0,
          animation: `node-circle-appear ${INITIAL_ANIMATION_DURATION / 2}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
          transition: `cx ${animationDuration}ms, cy ${animationDuration}ms`,
        }}
      />
    </g>
  );
}

NodeBranch.propTypes = {
  id: PropTypes.string.isRequired,
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
};
