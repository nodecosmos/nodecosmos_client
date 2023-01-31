import React from 'react';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodeButtonBackground from '../../hooks/tree/useNodeButtonBackground';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  MARGIN_LEFT,
  MARGIN_TOP,
  TRANSITION_ANIMATION_DURATION,
} from './constants';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default function NodeBranch(props) {
  const {
    id,
    upperSiblingId,
    nestedLevel,
    isRoot,
  } = props;

  const theme = useTheme();
  const isReplacingTempNode = useSelector((state) => state.nodes.byId[id]?.isReplacingTempNode);
  const parentId = useSelector((state) => state.nodes.byId[id]?.parent_id);

  const x = useSelector((state) => state.nodes.positionsById[id]?.x);
  const xEnds = useSelector((state) => state.nodes.positionsById[id]?.xEnds);
  const y = useSelector((state) => state.nodes.positionsById[id]?.y);

  const upperSiblingY = useSelector((state) => upperSiblingId && state.nodes.positionsById[upperSiblingId]?.y);

  const parentPositionY = useSelector((state) => state.nodes.positionsById[parentId]?.y);
  const parentPositionXEnds = useSelector((state) => state.nodes.positionsById[parentId]?.xEnds);

  const { parentBackgroundColor } = useNodeButtonBackground({ id, nestedLevel, isRoot });

  const linkX = (isRoot ? 0 : parentPositionXEnds) + MARGIN_LEFT;
  const linkY = upperSiblingY ? upperSiblingY + 2.5 : parentPositionY + MARGIN_TOP;

  const yLength = y - linkY;
  const circleY = linkY + yLength - 1;

  if (!x) { return null; }

  if (isRoot) {
    return (
      <g>
        <circle cx={x} cy={y} r={6} fill={parentBackgroundColor} />
        <path strokeWidth={4} d={`M ${x} ${y} L ${xEnds} ${y}`} stroke={parentBackgroundColor} />
      </g>
    );
  }

  const animationDuration = isSafari || isReplacingTempNode ? 0 : TRANSITION_ANIMATION_DURATION;
  const initialAnimationDelay = isReplacingTempNode ? 0 : INITIAL_ANIMATION_DELAY;
  const initialAnimationDuration = isReplacingTempNode ? 0 : INITIAL_ANIMATION_DURATION;

  return (
    <g>
      <path
        strokeWidth={3.5}
        d={`M ${linkX} ${y}
            C ${linkX} ${y}
              ${linkX + 25} ${y + 1}
              ${xEnds} ${y}
            L ${xEnds} ${y}`}
        stroke={theme.palette.tree.default}
        fill="transparent"
        style={{
          opacity: 0,
          animation: `node-path-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
          transition: `d ${animationDuration}ms`,
        }}
      />
      <circle
        cx={x}
        cy={circleY}
        r={5}
        fill={parentBackgroundColor}
        style={{
          opacity: 0,
          animation: `node-circle-appear ${initialAnimationDuration / 2}ms ${initialAnimationDelay}ms forwards`,
          transition: `cx ${animationDuration}ms, cy ${animationDuration}ms`,
        }}
      />
    </g>
  );
}

NodeBranch.defaultProps = {
  upperSiblingId: null,
};

NodeBranch.propTypes = {
  id: PropTypes.string.isRequired,
  upperSiblingId: PropTypes.string,
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
};
