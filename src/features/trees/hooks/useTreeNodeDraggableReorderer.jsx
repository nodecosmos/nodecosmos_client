/* eslint-disable no-shadow */
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDragAndDrop, setDragAndDrop, setTreeLoading } from '../treesSlice';
import { selectDragAndDrop } from '../trees.selectors';
import { reorderNodes } from '../../nodes/nodesSlice';
import { reorder } from '../../nodes/nodes.thunks';
import { setAlert } from '../../app/appSlice';

export default function useTreeNodeDraggableReorderer() {
  const dispatch = useDispatch();

  const { nodeId, rootId } = useSelector(selectDragAndDrop);

  const onDragStart = useCallback(({
    event,
    nodeId,
    parentId,
    treeNodeId,
    rootId,
  }) => {
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
  }, [dispatch]);

  const handleDragStop = useCallback(() => {
    dispatch(clearDragAndDrop());
  }, [dispatch]);

  const [reorderInProgress, setReorderInProgress] = useState(false);

  const onDropCapture = useCallback(async ({ newParentId, newSiblingIndex, newBottomSiblingId }) => {
    if (reorderInProgress) {
      dispatch(setAlert({
        isOpen: true,
        severity: 'warning',
        message: 'Another reorder in progress. Please wait!',
      }));

      return;
    }

    try {
      const response = await dispatch(reorder({
        rootId,
        id: nodeId,
        newParentId,
        newSiblingIndex,
        newBottomSiblingId,
      }));

      if (response.error) {
        throw response.error;
      }

      await dispatch(reorderNodes({
        nodeId,
        newParentId,
        newSiblingIndex,
      }));

      console.log('hit reorder over');

      dispatch(setTreeLoading(false));
      dispatch(clearDragAndDrop());
      setReorderInProgress(false);
    } catch (e) {
      let message;

      if (e.message.includes(423)) {
        message = 'Resource locked! Reorder in progress.';
      } else if (e.message.includes(403)) {
        message = 'Forbidden!';
      } else {
        message = 'Something went wrong while reordering the node. Please try again.';
        console.error(e);
      }

      dispatch(setAlert({ isOpen: true, severity: 'error', message }));
      dispatch(setTreeLoading(false));
      setReorderInProgress(false);
    }
  }, [reorderInProgress, dispatch, rootId, nodeId]);

  return {
    onDragStart,
    handleDragStop,
    onDropCapture,
  };
}
