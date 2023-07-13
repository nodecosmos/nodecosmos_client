import React from 'react';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodeButtonBackground from '../hooks/useNodeButtonBackground';
import { INITIAL_ANIMATION_DELAY, INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION } from '../trees.constants';
import { selectPosition, selectTreeNodeAttribute } from '../trees.selectors';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default function NodeBranch(props) {
  const { treeNodeId, alreadyMounted } = props;

  const theme = useTheme();

  const isRoot = useSelector(selectTreeNodeAttribute(treeNodeId, 'isRoot'));
  const { x, xEnd, y } = useSelector(selectPosition(treeNodeId));
  const { parentBackgroundColor } = useNodeButtonBackground(treeNodeId);

  if (!x) { return null; }

  if (isRoot) {
    return (
      <g>
        <circle cx={x} cy={y} r={6} fill={parentBackgroundColor} />
        <path strokeWidth={4} d={`M ${x} ${y} L ${xEnd} ${y}`} stroke={theme.palette.tree.default} />
      </g>
    );
  }

  const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;
  const initialAnimationDuration = isSafari || alreadyMounted ? 0 : INITIAL_ANIMATION_DURATION;
  const initialAnimationDelay = isSafari || alreadyMounted ? 0 : INITIAL_ANIMATION_DELAY;

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
          animation: `appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
          transition: `d ${transitionAnimationDuration}ms`,
        }}
      />
      <circle
        cx={x}
        cy={y}
        r={5}
        fill={parentBackgroundColor}
        style={{
          opacity: 0,
          animation: `node-circle-appear ${initialAnimationDuration / 2}ms ${initialAnimationDelay}ms forwards`,
          transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
        }}
      />
    </g>
  );
}

NodeBranch.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
  alreadyMounted: PropTypes.bool.isRequired,
};
