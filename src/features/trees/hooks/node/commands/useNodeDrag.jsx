import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDragAndDrop, setDragAndDrop, updateTreeNode } from '../../../treesSlice';
import useNodeContext from '../useNodeContext';
import { selectDragAndDrop } from '../../../trees.selectors';
import useNodeDropCapture from '../../reorderer/useNodeDropCapture';
import { selectIsNodeActionInProgress } from '../../../../nodes/nodes.selectors';

export default function useNodeDrag() {
  const {
    treeNodeId,
    isTreeRoot,
    isDragOver,
    parentId,
    nodeId,
    treeAncestorIds,
    rootId,
  } = useNodeContext();
  const { nodeId: dragAndDropNodeId, treeNodeId: dragAndDropTreeNodeId } = useSelector(selectDragAndDrop);
  const dispatch = useDispatch();
  const onNodeDropCapture = useNodeDropCapture();
  const isNodeActionInProgress = useSelector(selectIsNodeActionInProgress);

  //--------------------------------------------------------------------------------------------------------------------
  const startDrag = useCallback((event) => {
    if (isTreeRoot || isNodeActionInProgress) {
      event.preventDefault();
      return;
    }

    event.stopPropagation();

    const img = document.createElement('img');
    img.src = '/drag-image.svg';
    event.dataTransfer.setDragImage(img, 5, -10);

    dispatch(setDragAndDrop({
      isDragging: true,
      parentId,
      treeNodeId,
      rootId,
      nodeId,
    }));
  }, [dispatch, isNodeActionInProgress, isTreeRoot, nodeId, parentId, rootId, treeNodeId]);

  //--------------------------------------------------------------------------------------------------------------------
  const dragOver = useCallback((event) => {
    event.preventDefault();

    if (isDragOver || nodeId === dragAndDropNodeId || treeAncestorIds.includes(dragAndDropTreeNodeId)) return;

    dispatch(updateTreeNode({
      treeNodeId,
      isDragOver: true,
    }));
  }, [isDragOver, nodeId, dragAndDropNodeId, treeAncestorIds, dragAndDropTreeNodeId, dispatch, treeNodeId]);

  //--------------------------------------------------------------------------------------------------------------------
  const dragLeave = useCallback(() => {
    if (!isDragOver) return;

    dispatch(updateTreeNode({
      treeNodeId,
      isDragOver: false,
    }));
  }, [dispatch, isDragOver, treeNodeId]);

  //--------------------------------------------------------------------------------------------------------------------
  const stopDrag = useCallback(() => {
    dispatch(clearDragAndDrop());

    if (!isDragOver) return;
    dispatch(updateTreeNode({
      treeNodeId,
      isDragOver: false,
    }));
  }, [dispatch, isDragOver, treeNodeId]);

  //--------------------------------------------------------------------------------------------------------------------
  const captureDroppedNode = useCallback(
    () => {
      if (nodeId === dragAndDropNodeId || treeAncestorIds.includes(dragAndDropTreeNodeId)) return;

      onNodeDropCapture({
        newParentId: nodeId,
        newSiblingIndex: 0,
      });

      if (!isDragOver) return;

      dispatch(updateTreeNode({
        treeNodeId,
        isDragOver: false,
      }));
    },
    [
      dispatch,
      dragAndDropNodeId,
      dragAndDropTreeNodeId,
      isDragOver,
      nodeId,
      onNodeDropCapture,
      treeNodeId,
      treeAncestorIds,
    ],
  );

  //--------------------------------------------------------------------------------------------------------------------
  return {
    startDrag,
    stopDrag,
    dragOver,
    dragLeave,
    captureDroppedNode,
  };
}
