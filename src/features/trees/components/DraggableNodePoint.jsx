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

      <rect
        x={x - 10}
        y={y - 45}
        width="300"
        height="35"
        rx="4"
        fill={theme.palette.borders[5]}
        fillOpacity={hovered ? 0.2 : 0}
      />
    </g>
  );
}

DraggableNodePoint.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
  siblingIndex: PropTypes.number.isRequired,
};
