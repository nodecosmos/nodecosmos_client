import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDragAndDrop, setDragAndDrop, updateTreeNode } from '../../../treesSlice';
import useNodeContext from '../useNodeContext';
import { selectDragAndDrop } from '../../../trees.selectors';
import { selectChildIds } from '../../../../nodes/nodes.selectors';
import useNodeDropCapture from '../../reorderer/useNodeDropCapture';

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
  const firstChildId = useSelector(selectChildIds(nodeId))[0];
  const dispatch = useDispatch();
  const onNodeDropCapture = useNodeDropCapture();

  //--------------------------------------------------------------------------------------------------------------------
  const startDrag = useCallback((event) => {
    if (isTreeRoot) {
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
  }, [dispatch, isTreeRoot, nodeId, parentId, rootId, treeNodeId]);

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
        newBottomSiblingId: firstChildId,
      });

      if (!isDragOver) return;

      dispatch(updateTreeNode({
        treeNodeId,
        isDragOver: false,
      }));
    },
    [
      nodeId,
      dragAndDropNodeId,
      treeAncestorIds, dragAndDropTreeNodeId, onNodeDropCapture, firstChildId, isDragOver, dispatch, treeNodeId,
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
