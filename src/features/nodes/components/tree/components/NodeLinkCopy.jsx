/* eslint-disable no-void */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP } from '../constants';

function renderRootLink(node, color) {
  return (
    <>
      <circle cx={node.x} cy={node.y} r={6} fill="#43464e" />
      <path
        strokeWidth={4}
        d={`M ${node.x} ${node.y} L ${node.xEnds} ${node.y}`}
        stroke="#43464e"
        fill="transparent"
      />
    </>
  );
}

export default function NodeLink(props) {
  const {
    node,
    parent,
    upperSibling,
    isRoot,
    isLastChild,
    color,
    parentColor,
  } = props;

  const linkX = parent.xEnds + MARGIN_LEFT;
  const linkY = upperSibling.id ? upperSibling.y + 6 : parent.y + MARGIN_TOP;
  const pathLength = node.y - (parent.y + MARGIN_TOP) + EDGE_LENGTH - 2.72918701171875;
  const pathRef = useRef(null);
  const circleRef = useRef(null);

  if (isRoot) return renderRootLink(node, color);

  return (
    <g>
      <path
        ref={pathRef}
        strokeWidth={parent.initHide ? 0 : 3}
        d={`M ${linkX} ${linkY}
            L ${linkX} ${node.y - 20}
            C ${linkX} ${node.y} 
              ${linkX} ${node.y}
              ${linkX + 10} ${node.y}
            L ${node.xEnds} ${node.y}`}
        stroke="#43464e"
        fill="transparent"
        style={{
          offsetPath: `M ${linkX} ${(parent.y + MARGIN_TOP)}
            L ${linkX} ${node.y - 20}
            C ${linkX} ${node.y} 
              ${linkX} ${node.y}
              ${linkX + 10} ${node.y}
            L ${node.xEnds} ${node.y}`,
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          animation: 'dash .25s forwards',
          transition: 'all .25s ',
        }}
      />
      {!false && (
        <circle
          id={`circle-${node.id}`}
          ref={circleRef}
          cx={node.x}
          cy={linkY + 5}
          r={parent.initHide ? 0 : 6}
          style={{
            offsetPath: `path("M ${0} ${0} L ${0} ${node.y - linkY - 5}")`,
            animation: 'move .145s forwards',
            transition: 'all .25s',
          }}
          fill={parentColor}
        />
      )}
    </g>
  );
}

NodeLink.propTypes = {
  node: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  upperSibling: PropTypes.object.isRequired,
  isRoot: PropTypes.bool.isRequired,
  isLastChild: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  parentColor: PropTypes.string.isRequired,
};
