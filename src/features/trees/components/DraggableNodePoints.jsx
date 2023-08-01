import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectDragAndDrop, selectTreeNodeAttribute } from '../trees.selectors';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import DraggableNodePoint from './DraggableNodePoint';

function DraggableNodePoints({ treeNodeId }) {
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const ancestorIds = useSelector(selectNodeAttribute(nodeId, 'ancestorIds'));

  const treeChildIds = useSelector(selectTreeNodeAttribute(treeNodeId, 'treeChildIds'));
  const isExpanded = useSelector(selectTreeNodeAttribute(treeNodeId, 'isExpanded'));
  const dragAndDrop = useSelector(selectDragAndDrop);

  if (!isExpanded || !treeChildIds
    || !dragAndDrop.isDragging
    || dragAndDrop.nodeId === nodeId
    || ancestorIds.indexOf(nodeId) >= 0
  ) return null;

  return (
    treeChildIds.map((treeChildId, index) => (
      <DraggableNodePoint treeNodeId={treeChildId} key={treeChildId} siblingIndex={index} />
    ))
  );
}

DraggableNodePoints.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};

export default DraggableNodePoints;
