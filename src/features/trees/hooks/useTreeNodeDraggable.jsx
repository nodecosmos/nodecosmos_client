/* eslint-disable no-shadow */
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDragAndDrop, setDragAndDrop, setTreeLoading } from '../treesSlice';
import { selectDragAndDrop } from '../trees.selectors';
import { reorderNodes } from '../../nodes/nodesSlice';
import { reorder } from '../../nodes/nodes.thunks';
import { setAlert } from '../../app/appSlice';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';

const REORDER_DESCENDANT_LIMIT = 1000;

export default function useTreeNodeDraggable() {
  const dispatch = useDispatch();

  const { nodeId, persistentId, persistentRootId } = useSelector(selectDragAndDrop);
  const descendantIds = useSelector(selectNodeAttribute(persistentId, 'descendantIds'));

  const onDragStart = useCallback(({
    event,
    nodeId,
    parentId,
    treeNodeId,
    persistentRootId,
    persistentId,
  }) => {
    event.stopPropagation();

    const img = document.createElement('img');
    img.src = '/drag-image.svg';
    event.dataTransfer.setDragImage(img, 5, -10);

    dispatch(setDragAndDrop({
      isDragging: true,
      nodeId,
      parentId,
      treeNodeId,
      persistentRootId,
      persistentId,
    }));
  }, [dispatch]);

  const handleDragStop = useCallback(() => {
    dispatch(clearDragAndDrop());
  }, [dispatch]);

  const onDropCapture = useCallback(async ({
    newParentId,
    newSiblingIndex,
    persistentNewParentId,
  }) => {
    if (descendantIds.length > REORDER_DESCENDANT_LIMIT) {
      dispatch(setAlert({
        isOpen: true,
        severity: 'error',
        message: `Reorder is not allowed for nodes with more than ${REORDER_DESCENDANT_LIMIT} descendants`,
      }));

      dispatch(clearDragAndDrop());
      return;
    }

    try {
      const response = await dispatch(reorder({
        rootId: persistentRootId,
        id: persistentId,
        newParentId: persistentNewParentId,
        newSiblingIndex,
      }));

      if (response.error) {
        throw response.error;
      }

      dispatch(setTreeLoading(false));
      dispatch(reorderNodes({
        nodeId,
        newParentId,
        newSiblingIndex,
      }));

      dispatch(clearDragAndDrop());
    } catch (e) {
      let message;

      if (e.message.includes(423)) {
        message = 'Resource locked! Reorder in progress.';
      } else if (e.message.includes(403)) {
        message = 'Forbidden! You are not allowed to reorder this node.';
      } else {
        message = 'Something went wrong while reordering the node. Please try again.';
      }

      dispatch(setAlert({
        isOpen: true,
        severity: 'error',
        message,
      }));

      dispatch(setTreeLoading(false));
    }
  }, [dispatch, descendantIds, persistentId, persistentRootId, nodeId]);

  return {
    onDragStart,
    handleDragStop,
    onDropCapture,
  };
}
