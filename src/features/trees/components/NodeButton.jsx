import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
/* nodecosmos */
import useNodeButtonColors from '../hooks/useNodeButtonColors';
import useNodeTreeEvents from '../hooks/useNodeTreeEvents';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { selectDragAndDrop, selectTreeNodeAttribute } from '../trees.selectors';
import useTreeNodeDraggable from '../hooks/useTreeNodeDraggable';
import NodeSymbol from './NodeSymbol';

const MemoizedButtonBase = memo(ButtonBase);

export default function NodeButton(props) {
  const {
    treeNodeId,
  } = props;
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const title = useSelector(selectNodeAttribute(nodeId, 'title'));
  const parentId = useSelector(selectNodeAttribute(nodeId, 'parentId'));
  const ancestorIds = useSelector(selectNodeAttribute(nodeId, 'ancestorIds'));
  const persistentRootId = useSelector(selectNodeAttribute(nodeId, 'persistentRootId'));
  const persistentId = useSelector(selectNodeAttribute(nodeId, 'persistentId'));
  const dragAndDrop = useSelector(selectDragAndDrop);

  const theme = useTheme();
  const { handleTreeNodeClick } = useNodeTreeEvents(treeNodeId);
  const {
    backgroundColor,
    outlineColor,
    color,
    hasBg,
    outlinedColored,
  } = useNodeButtonColors(treeNodeId);
  const { onDragStart, handleDragStop, onDropCapture } = useTreeNodeDraggable({});
  const [dragOver, setDragOver] = useState(false);

  const handleDragStart = (event) => {
    onDragStart({
      event, nodeId, parentId, treeNodeId, persistentId, persistentRootId,
    });
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    if (nodeId === dragAndDrop.nodeId || ancestorIds.includes(dragAndDrop.nodeId)) return;
    setDragOver(true);
  };

  const handleDragEnd = (event) => {
    handleDragStop(event);
    setDragOver(false);
  };

  const handleDropCapture = () => {
    if (nodeId === dragAndDrop.nodeId || ancestorIds.includes(dragAndDrop.nodeId)) return;

    onDropCapture({
      newParentId: nodeId,
      newSiblingIndex: 0,
      persistentNewParentId: persistentId,
    });

    setDragOver(false);
  };

  return (
    <MemoizedButtonBase
      disableRipple
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
      <NodeSymbol treeNodeId={treeNodeId} />

      <div className="NodeButtonText">
        {title}
      </div>
    </MemoizedButtonBase>
  );
}

NodeButton.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};
