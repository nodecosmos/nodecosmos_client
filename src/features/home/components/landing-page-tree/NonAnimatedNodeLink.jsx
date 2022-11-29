import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { MARGIN_LEFT, MARGIN_TOP } from './constants';
import useNodeButtonBackground from '../../hooks/landing-page-tree/useNodeButtonBackground';

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

  return (
    <g>
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
        stroke="#414650"
        fill="transparent"
      />
      <circle
        ref={circleRef}
        cx={x}
        cy={circleY}
        r={5}
        fill={parentBackgroundColor}
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
