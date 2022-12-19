import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodeButtonBackground from '../../hooks/landing-page-tree/useNodeButtonBackground';
import {
  EDGE_LENGTH, INITIAL_ANIMATION_DURATION, MARGIN_LEFT, MARGIN_TOP, TRANSITION_ANIMATION_DURATION,
} from './constants';

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

export default function NodeLink(props) {
  const {
    id,
    upperSiblingID,
    nestedLevel,
    isRoot,
  } = props;

  const { x, xEnds, y } = useSelector((state) => state.landingPageNodes[id].position);

  const upperSiblingPosition = useSelector((state) => upperSiblingID
    && state.landingPageNodes[upperSiblingID].position);

  const parentID = useSelector((state) => state.landingPageNodes[id].parent_id);
  const parentPosition = useSelector((state) => !isRoot && parentID && state.landingPageNodes[parentID].position);
  const parentPositionY = isRoot ? 0 : parentPosition.y;

  const linkX = (isRoot ? 0 : parentPosition.xEnds) + MARGIN_LEFT;
  const circleY = upperSiblingPosition ? upperSiblingPosition.y + 2.5 : parentPositionY + MARGIN_TOP;

  const pathLength = y + EDGE_LENGTH;

  const pathRef = useRef(null);
  const circleRef = useRef(null);

  const { parentBackgroundColor } = useNodeButtonBackground({
    id,
    nestedLevel,
    isRoot,
  });

  if (!x) return null;
  if (isRoot) return renderRootLink({ x, xEnds, y });

  return (
    <g>
      <path
        ref={pathRef}
        strokeWidth={3.5}
        d={`M ${linkX} ${y}
            C ${linkX} ${y - 10}
              ${linkX} ${y}
              ${linkX + 8} ${y}
            L ${xEnds} ${y}`}
        stroke="#414650"
        fill="transparent"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          animation: `dash ${INITIAL_ANIMATION_DURATION * 1.25}s forwards`,
          transition: `d ${TRANSITION_ANIMATION_DURATION}s`,
        }}
      />
      <circle
        ref={circleRef}
        cx={x}
        cy={circleY + 6}
        r={5}
        style={{
          offsetPath: `path("M ${0} ${0} L ${0} ${y - circleY - 8.5}")`,
          animation: `move ${INITIAL_ANIMATION_DURATION / 4}s forwards`,
          transition: `cy ${TRANSITION_ANIMATION_DURATION}s, offset-path ${TRANSITION_ANIMATION_DURATION}s`,
        }}
        fill={parentBackgroundColor}
      />
    </g>
  );
}

NodeLink.defaultProps = {
  upperSiblingID: null,
};

NodeLink.propTypes = {
  id: PropTypes.string.isRequired,
  upperSiblingID: PropTypes.string,
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
};
