import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useShallowEqualSelector from '../../../../../helpers/useShallowEqualSelector';
import { EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP } from '../constants';

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
    parentID,
    upperSiblingID,
    isRoot,
    parentColor,
  } = props;

  const { x, xEnds, y } = useShallowEqualSelector((state) => (state.nodes[id].position));

  const upperSiblingPosition = useShallowEqualSelector(
    (state) => upperSiblingID && state.nodes[upperSiblingID].position,
  );

  const parentPosition = useShallowEqualSelector((state) => parentID && state.nodes[parentID].position);
  const parentPositionY = isRoot ? 0 : parentPosition.y;

  const linkX = (isRoot ? 0 : parentPosition.xEnds) + MARGIN_LEFT;
  const linkY = upperSiblingPosition ? upperSiblingPosition.y + 3 : parentPositionY + MARGIN_TOP;

  const yLength = y - linkY;
  const pathLength = y + EDGE_LENGTH - 2.72918701171875;

  const pathRef = useRef(null);
  const circleRef = useRef(null);

  if (!x) return null;
  if (isRoot) return renderRootLink({ x, xEnds, y });

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
          animation: 'dash .5s forwards',
          transition: 'all .25s ',
        }}
      />
      <circle
        ref={circleRef}
        cx={x}
        cy={linkY + 2.5}
        r={5}
        style={{
          offsetPath: `path("M ${0} ${0} L ${0} ${y - linkY - 5}")`,
          animation: 'move .12s forwards',
          transition: 'all .25s',
        }}
        fill={parentColor}
      />
    </g>
  );
}

NodeLink.defaultProps = {
  upperSiblingID: null,
  parentID: null,
};

NodeLink.propTypes = {
  id: PropTypes.string.isRequired,
  parentID: PropTypes.string,
  upperSiblingID: PropTypes.string,
  isRoot: PropTypes.bool.isRequired,
  parentColor: PropTypes.string.isRequired,
};
