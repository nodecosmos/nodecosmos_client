import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectDragAndDrop } from '../../trees.selectors';
import useTreeNodeVirtualizer from '../../hooks/useTreeNodesVirtualizer';
import DraggableNodePoint from './DraggableNodePoint';

function DraggableNodePoints({ rootNodeId }) {
  const dragAndDrop = useSelector(selectDragAndDrop);
  const treeNodeIdsToView = useTreeNodeVirtualizer(rootNodeId);

  if (!dragAndDrop.isDragging) return null;

  return treeNodeIdsToView.map(([treeNodeId, isAlreadyMounted], index) => {
    if (index === 0) return null;
    return (
      <DraggableNodePoint
        key={treeNodeId}
        treeNodeId={treeNodeId}
        isAlreadyMounted={isAlreadyMounted}
      />
    );
  });
}

DraggableNodePoints.propTypes = {
  rootNodeId: PropTypes.string.isRequired,
};

export default DraggableNodePoints;
