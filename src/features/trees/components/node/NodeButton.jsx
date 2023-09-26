import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
/* nodecosmos */
import useNodeButtonColors from '../../hooks/useNodeButtonColors';
import useNodeTreeEvents from '../../hooks/useNodeTreeEvents';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import { selectDragAndDropAttributes, selectTreeNodeAttribute } from '../../trees.selectors';
import useTreeNodeDraggableReorderer from '../../hooks/useTreeNodeDraggableReorderer';
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
  const rootId = useSelector(selectNodeAttribute(nodeId, 'rootId'));
  const dragAndDropNodeId = useSelector(selectDragAndDropAttributes('nodeId'));

  const theme = useTheme();
  const { handleTreeNodeClick } = useNodeTreeEvents(treeNodeId);
  const {
    backgroundColor,
    outlineColor,
    color,
    hasBg,
    outlinedColored,
  } = useNodeButtonColors(treeNodeId);
  const { onDragStart, handleDragStop, onDropCapture } = useTreeNodeDraggableReorderer({});
  const [dragOver, setDragOver] = useState(false);

  const handleDragStart = useCallback((event) => {
    onDragStart({
      event, nodeId, parentId, treeNodeId, rootId,
    });
  }, [onDragStart, nodeId, parentId, treeNodeId, rootId]);

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
