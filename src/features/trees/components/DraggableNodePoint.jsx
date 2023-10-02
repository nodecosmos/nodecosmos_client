import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import { selectDragAndDrop, selectPosition, selectTreeNodeAttribute } from '../trees.selectors';
import useTreeNodeDraggableReorderer from '../hooks/useTreeNodeDraggableReorderer';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { useTreeRootNodeId } from '../hooks/useTreeContext';

export default function DraggableNodePoint({ treeNodeId }) {
  const theme = useTheme();
  const rootNodeId = useTreeRootNodeId();

  const { x, y } = useSelector(selectPosition(rootNodeId, treeNodeId));
  const dragAndDrop = useSelector(selectDragAndDrop);
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const siblingIndex = useSelector(selectTreeNodeAttribute(treeNodeId, 'treeSiblingIndex'));

  const parentId = useSelector(selectNodeAttribute(nodeId, 'parentId'));
  const isTemp = useSelector(selectNodeAttribute(nodeId, 'isTemp'));
  const ancestorIds = useSelector(selectNodeAttribute(nodeId, 'ancestorIds'));

  const draggedNodeSiblingIndex = useSelector(selectTreeNodeAttribute(dragAndDrop.treeNodeId, 'treeSiblingIndex'));

  const { onDropCapture } = useTreeNodeDraggableReorderer();

  const [hovered, setHovered] = useState(false);

  const isSameParent = dragAndDrop.parentId === parentId;

  // handle new sibling index when a node is moved down on the same level
  let newSiblingIndex = siblingIndex;
  if (draggedNodeSiblingIndex < siblingIndex && isSameParent) {
    newSiblingIndex -= 1;
  }

  if (
    !x
    || !y
    || dragAndDrop.treeNodeId === treeNodeId
    || isTemp
    || (isSameParent && draggedNodeSiblingIndex === siblingIndex - 1)
    || ancestorIds.includes(dragAndDrop.nodeId)
  ) return null;

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
          newSiblingIndex,
          newBottomSiblingId: nodeId,
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
        fill={theme.palette.background[8]}
        fillOpacity={hovered ? 0.6 : 0}
      />
    </g>
  );
}

DraggableNodePoint.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};
