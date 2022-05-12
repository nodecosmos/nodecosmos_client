/* eslint-disable no-void */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP } from '../constants';

function renderRootLink(micron, color) {
  return (
    <>
      <circle cx={micron.x} cy={micron.y} r={6} fill="#43464e" />
      <path
        strokeWidth={4}
        d={`M ${micron.x} ${micron.y} L ${micron.xEnds} ${micron.y}`}
        stroke="#43464e"
        fill="transparent"
      />
    </>
  );
}

export default function NodeLink(props) {
  const {
    micron,
    parent,
    isRoot,
    isLastChild,
    color,
    parentColor,
  } = props;

  const linkX = parent.xEnds + MARGIN_LEFT;
  const linkY = parent.y + MARGIN_TOP;
  const pathLength = micron.y + EDGE_LENGTH - 2.72918701171875;

  const pathRef = useRef(null);
  const circleRef = useRef(null);

  if (isRoot) return renderRootLink(micron, color);

  return (
    <>
      <path
        ref={pathRef}
        strokeWidth={parent.initHide ? 0 : 2}
        d={`M ${linkX} ${linkY}
            L ${linkX} ${micron.y}
            L ${micron.xEnds} ${micron.y}`}
        stroke={parentColor}
        fill="transparent"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          animation: 'dash .25s forwards',
          transition: 'all .25s ',
        }}
      />
      <circle
        ref={circleRef}
        cx={micron.x}
        cy={linkY + 4}
        r={6}
        style={{
          offsetPath: `path("M ${0} ${0} L ${0} ${micron.y - linkY - 5}")`,
          animation: 'move .145s forwards',
          transition: 'all .25s',
        }}
        fill={parentColor}
      />
    </>
  );
}

NodeLink.propTypes = {
  micron: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  isRoot: PropTypes.bool.isRequired,
  isLastChild: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  parentColor: PropTypes.string.isRequired,
};
