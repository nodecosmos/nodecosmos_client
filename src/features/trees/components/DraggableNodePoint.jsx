import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import { selectPosition, selectTreeNodeAttribute } from '../trees.selectors';
import useTreeNodeDraggable from '../hooks/useTreeNodeDraggable';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';

export default function DraggableNodePoint({ treeNodeId, siblingIndex }) {
  const { x, y } = useSelector(selectPosition(treeNodeId));
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const parentId = useSelector(selectNodeAttribute(nodeId, 'parentId'));

  const { onDropCapture } = useTreeNodeDraggable();

  if (!x || !y) return null;

  return (
    <g
      onDragOver={(e) => {
        e.preventDefault();
        setHovered(true);
      }}
      onDragLeave={() => setHovered(false)}
      onDropCapture={() => {
        onDropCapture({
          newParentId: parentId,
          newSiblingIndex: siblingIndex,
        });
      }}
    >

      <rect
        x={x - 10}
        y={y - 27}
        width="20"
        height="5"
        rx="2"
        fill={theme.palette.borders[5]}
      />
      <line
        x1={x - 10}
        y1={y - 25}
        x2={x + 300}
        y2={y - 25}
        strokeWidth={5}
        stroke={hovered ? theme.palette.text.link : 'transparent'}
        // strokeDasharray="4 4"
      />
      {/* <line */}
      {/*   x1={x - 10} */}
      {/*   y1={y - 25} */}
      {/*   x2={x + 300} */}
      {/*   y2={y - 25} */}
      {/*   strokeWidth={3} */}
      {/*   stroke={hovered ? 'orange' : 'transparent'} */}
      {/* /> */}
      <rect
        x={x - 10}
        y={y - 30}
        width="200"
        height="8"
        rx="4"
        fill="transparent"
      />

    </g>
  );
}

DraggableNodePoint.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
  siblingIndex: PropTypes.number.isRequired,
};
