/* eslint-disable no-void */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP } from '../constants';

function renderRootLink(node) {
  return (
    <g className="DropShadow">
      <circle cx={node.x} cy={node.y} r={6} fill="#43464e" />
      <path
        strokeWidth={4}
        d={`M ${node.x} ${node.y} L ${node.xEnds} ${node.y}`}
        stroke="#43464e"
        fill="transparent"
      />
    </g>
  );
}

export default function NodeLink(props) {
  const {
    node,
    parent,
    upperSibling,
    isRoot,
    parentColor,
  } = props;

  const linkX = parent.xEnds + MARGIN_LEFT;
  const linkY = upperSibling ? upperSibling.y + 3 : parent.y + MARGIN_TOP;

  const yLength = node.y - linkY;

  const pathLength = node.y + EDGE_LENGTH - 2.72918701171875;

  const pathRef = useRef(null);
  const circleRef = useRef(null);

  if (isRoot) return renderRootLink(node);

  return (
    <g className="DropShadow">
      <path
        ref={pathRef}
        strokeWidth={parent.initHide ? 0 : 3.5}
        d={`M ${linkX} ${linkY}
            C ${linkX} ${linkY}
              ${linkX - 1} ${linkY + yLength / 2 - 10}
              ${linkX} ${node.y - 10}
            L ${linkX} ${node.y - 10}
            C ${linkX} ${node.y - 10}
              ${linkX} ${node.y}
              ${linkX + 8} ${node.y}
            L ${node.xEnds} ${node.y}`}
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
        cx={node.x}
        cy={linkY + 2.5}
        r={5}
        style={{
          offsetPath: `path("M ${0} ${0} L ${0} ${node.y - linkY - 5}")`,
          animation: 'move .12s forwards',
          transition: 'all .25s',
        }}
        fill={parentColor}
      />
    </g>
  );
}

NodeLink.defaultProps = {
  upperSibling: null,
};

NodeLink.propTypes = {
  node: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  upperSibling: PropTypes.object,
  isRoot: PropTypes.bool.isRequired,
  parentColor: PropTypes.string.isRequired,
};
