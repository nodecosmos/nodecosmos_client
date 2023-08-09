import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import { selectDragAndDrop, selectPosition, selectTreeNodeAttribute } from '../trees.selectors';
import useTreeNodeDraggable from '../hooks/useTreeNodeDraggable';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';

export default function DraggableNodePoint({ treeNodeId, siblingIndex }) {
  const { x, y } = useSelector(selectPosition(treeNodeId));
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const dragAndDrop = useSelector(selectDragAndDrop);
  const treeParentId = useSelector(selectTreeNodeAttribute(treeNodeId, 'treeParentId'));
  const parentsChildIds = useSelector(selectTreeNodeAttribute(treeParentId, 'treeChildIds'));
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const parentId = useSelector(selectNodeAttribute(nodeId, 'parentId'));
  const persistentParentId = useSelector(selectNodeAttribute(nodeId, 'persistentParentId'));
  const isTemp = useSelector(selectNodeAttribute(nodeId, 'isTemp'));
  let correctedIndex = siblingIndex; // correct sibling index when dragging a node up or down on the same level

  const selectedSiblingIndex = parentsChildIds.indexOf(dragAndDrop.treeNodeId);
  const isSameParent = dragAndDrop.parentId === parentId;

  // handle new sibling index when dragging a node down on the same level
  if (selectedSiblingIndex < siblingIndex && isSameParent) {
    correctedIndex -= 1;
  }

  const { onDropCapture } = useTreeNodeDraggable();

  if (
    !x
    || !y
    || dragAndDrop.treeNodeId === treeNodeId
    || isTemp
    || (isSameParent && selectedSiblingIndex === siblingIndex - 1)
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
          newSiblingIndex: correctedIndex,
          persistentNewParentId: persistentParentId,
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
  siblingIndex: PropTypes.number.isRequired,
};
