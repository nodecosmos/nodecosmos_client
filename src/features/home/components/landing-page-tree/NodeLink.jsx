import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodeButtonBackground from '../../hooks/landing-page-tree/useNodeButtonBackground';
import {
  EDGE_LENGTH,
  INITIAL_ANIMATION_DURATION, MARGIN_LEFT, MARGIN_TOP, TRANSITION_ANIMATION_DURATION,
} from './constants';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

function renderRootLink({ x, xEnds, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r={6} fill="#414650" />
      <path
        strokeWidth={4}
        d={`M ${x} ${y} L ${xEnds} ${y}`}
        stroke="#414650"
        fill="transparent"
      />
    </g>
  );
}

export default function NonAnimatedNodeLink(props) {
  const {
    id,
    upperSiblingID,
    nestedLevel,
    isRoot,
  } = props;

  const { x, xEnds, y } = useSelector((state) => state.landingPageNodes[id].position);
  const animateTransition = useSelector((state) => state.landingPageNodes[id].animateTransition);

  const upperSiblingPosition = useSelector((state) => upperSiblingID
    && state.landingPageNodes[upperSiblingID].position);

  const parentID = useSelector((state) => state.landingPageNodes[id].parent_id);
  const parentPosition = useSelector((state) => !isRoot && parentID && state.landingPageNodes[parentID].position);
  const parentPositionY = isRoot ? 0 : parentPosition.y;

  const linkX = (isRoot ? 0 : parentPosition.xEnds) + MARGIN_LEFT;
  const linkY = upperSiblingPosition ? upperSiblingPosition.y + 2.5 : parentPositionY + MARGIN_TOP;

  const yLength = y - linkY;
  const circleY = linkY + yLength - 2.5;

  const pathRef = useRef(null);
  const circleRef = useRef(null);

  const { parentBackgroundColor } = useNodeButtonBackground({
    id,
    nestedLevel,
    isRoot,
  });

  if (!x) return null;
  if (isRoot) return renderRootLink({ x, xEnds, y });

  const animationDuration = isSafari || !animateTransition ? 0 : TRANSITION_ANIMATION_DURATION;

  return (
    <g>
      <Box
        component="path"
        ref={pathRef}
        strokeWidth={3.5}
        d={`M ${linkX} ${y}
            C ${linkX} ${y}
              ${linkX + 25} ${y + 1}
              ${xEnds} ${y}
            L ${xEnds} ${y}`}
        stroke="#414650"
        fill="transparent"
        style={{
          strokeDasharray: EDGE_LENGTH,
          strokeDashoffset: EDGE_LENGTH,
        }}
        sx={{
          animation: `dash ${INITIAL_ANIMATION_DURATION}ms forwards`,
          transition: `d ${animationDuration}ms`,
        }}
      />
      <Box
        component="circle"
        ref={circleRef}
        cx={x}
        cy={circleY}
        r={5}
        fill={parentBackgroundColor}
        sx={{
          animation: `node-circle-appear ${INITIAL_ANIMATION_DURATION / 2}ms forwards`,
          transition: `cx ${animationDuration}ms, cy ${animationDuration}ms`,
        }}
      />
    </g>
  );
}

NonAnimatedNodeLink.defaultProps = {
  upperSiblingID: null,
};

NonAnimatedNodeLink.propTypes = {
  id: PropTypes.string.isRequired,
  upperSiblingID: PropTypes.string,
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
};
