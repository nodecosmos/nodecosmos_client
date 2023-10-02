import React, { useCallback, useState } from 'react';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
/* nodecosmos */
import useNodeTreeEvents from '../../hooks/useNodeTreeEvents';
import { selectDragAndDropAttributes } from '../../trees.selectors';
import useTreeNodeDraggableReorderer from '../../hooks/useTreeNodeDraggableReorderer';
import useNodeContext, { useNodeColors } from '../../hooks/useNodeContext';
import { selectChildIds } from '../../../nodes/nodes.selectors';
import NodeSymbol from './NodeSymbol';

export default function NodeButton() {
  const {
    treeNodeId,
    isTreeRoot,
    parentId,
    nodeId,
    title,
    ancestorIds,
    rootId,
  } = useNodeContext();
  const {
    backgroundColor,
    outlineColor,
    color,
    hasBg,
    outlinedColored,
  } = useNodeColors();

  const dragAndDropNodeId = useSelector(selectDragAndDropAttributes('nodeId'));

  const theme = useTheme();
  const { handleTreeNodeClick } = useNodeTreeEvents();
  const { onDragStart, handleDragStop, onDropCapture } = useTreeNodeDraggableReorderer();
  const [dragOver, setDragOver] = useState(false);

  const firstChildId = useSelector(selectChildIds(nodeId))[0];

  const handleDragStart = useCallback((event) => {
    if (isTreeRoot) {
      event.preventDefault();
      return;
    }

    onDragStart({
      event, nodeId, parentId, treeNodeId, rootId,
    });
  }, [isTreeRoot, onDragStart, nodeId, parentId, treeNodeId, rootId]);

  const handleDragOver = (event) => {
    event.preventDefault();
    if (nodeId === dragAndDropNodeId || ancestorIds.includes(dragAndDropNodeId)) return;
    setDragOver(true);
  };

  const handleDragEnd = (event) => {
    handleDragStop(event);
    setDragOver(false);
  };

  const handleDropCapture = () => {
    if (nodeId === dragAndDropNodeId || ancestorIds.includes(dragAndDropNodeId)) return;

    onDropCapture({
      newParentId: nodeId,
      newSiblingIndex: 0,
      newBottomSiblingId: firstChildId,
    });

    setDragOver(false);
  };

  return (
    <button
      draggable
      onMouseDown={(event) => event.stopPropagation()} // prevents pannable from firing
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragOver(false)}
      onDropCapture={handleDropCapture}
      type="button"
      className={`NodeButton ${hasBg && 'selected'} ${(outlinedColored || dragOver) && 'outlined'}`}
      onClick={handleTreeNodeClick}
      onKeyUp={(event) => event.preventDefault()}
      style={{
        border: '1px solid',
        borderColor: outlineColor,
        backgroundColor: dragOver ? theme.palette.tree.dragInIndicator : backgroundColor,
        color: dragOver ? theme.palette.text.primary : color,
      }}
    >
      <NodeSymbol />

      <div className="NodeButtonText">
        {title}
      </div>
    </button>
  );
}
