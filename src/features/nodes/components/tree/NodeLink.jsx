import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  ANIMATION_DURATION, EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP,
} from './constants';
import useNodeButtonBackground from '../../services/tree/useNodeButtonBackground';

function renderRootLink({ x, xEnds, y }) {
  return (
    <g className="DropShadow">
      <circle cx={x} cy={y} r={6} fill="#43464e" />
      <path
        strokeWidth={4}
        d={`M ${x} ${y} L ${xEnds} ${y}`}
        stroke="#43464e"
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

  const { x, xEnds, y } = useSelector((state) => state.nodes[id].position);
  const isNodeFetched = useSelector((state) => state.nodes[id].fetched);

  const upperSiblingPosition = useSelector((state) => upperSiblingID && state.nodes[upperSiblingID].position);

  const parentID = useSelector((state) => state.nodes[id].parent_id);
  const parentPosition = useSelector((state) => !isRoot && parentID && state.nodes[parentID].position);
  const parentPositionY = isRoot ? 0 : parentPosition.y;

  const linkX = (isRoot ? 0 : parentPosition.xEnds) + MARGIN_LEFT;
  const linkY = upperSiblingPosition ? upperSiblingPosition.y + 2.5 : parentPositionY + MARGIN_TOP;

  const circleY = parentPositionY; // circle starts going down from parent position

  const yLength = y - linkY;
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

  const animationDuration = isNodeFetched ? 0 : ANIMATION_DURATION;

  return (
    <g className="DropShadow">
      <path
        ref={pathRef}
        strokeWidth={3.5}
        d={`M ${linkX} ${linkY}
            C ${linkX} ${linkY}
              ${linkX - 1} ${linkY + yLength / 2 - 10}
              ${linkX} ${y - 10}
            L ${linkX} ${y - 10}
            C ${linkX} ${y - 10}
              ${linkX} ${y}
              ${linkX + 8} ${y}
            L ${xEnds} ${y}`}
        stroke="#43464e"
        fill="transparent"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          animation: `dash ${animationDuration}s forwards`,
          transition: `all ${animationDuration}s`,
        }}
      />
      <circle
        ref={circleRef}
        cx={x}
        cy={circleY + 2.5}
        r={5}
        style={{
          offsetPath: `path("M ${0} ${0} L ${0} ${y - circleY - 5}")`,
          animation: `move ${animationDuration / 2}s forwards`,
          transition: `all ${animationDuration}s`,
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
