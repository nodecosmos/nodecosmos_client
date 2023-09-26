/* eslint-disable no-shadow */
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDragAndDrop, setDragAndDrop, setTreeLoading } from '../treesSlice';
import { selectDragAndDrop } from '../trees.selectors';
import { reorderNodes } from '../../nodes/nodesSlice';
import { reorder } from '../../nodes/nodes.thunks';
import { setAlert } from '../../app/appSlice';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';

const REORDER_DESCENDANT_LIMIT = 1000;

export default function useTreeNodeDraggableReorderer() {
  const dispatch = useDispatch();

  const { nodeId, rootId } = useSelector(selectDragAndDrop);
  const descendantIds = useSelector(selectNodeAttribute(nodeId, 'descendantIds'));

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

  const onDropCapture = useCallback(async ({ newParentId, newSiblingIndex }) => {
    if (reorderInProgress) {
      dispatch(setAlert({
        isOpen: true,
        severity: 'warning',
        message: 'Another reorder in progress. Please wait!',
      }));

      return;
    }

    if (descendantIds.length > REORDER_DESCENDANT_LIMIT) {
      dispatch(setAlert({
        isOpen: true,
        severity: 'error',
        message: `Reorder is not allowed for nodes with more than ${REORDER_DESCENDANT_LIMIT} descendants`,
      }));

      setReorderInProgress(false);
      dispatch(clearDragAndDrop());
      return;
    }

    try {
      const response = await dispatch(reorder({
        rootId, id: nodeId, newParentId, newSiblingIndex,
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
        message = 'Forbidden! You are not allowed to reorder this node.';
      } else {
        message = 'Something went wrong while reordering the node. Please try again.';
        console.error(e);
      }

      dispatch(setAlert({ isOpen: true, severity: 'error', message }));
      dispatch(setTreeLoading(false));
      setReorderInProgress(false);
    }
  }, [reorderInProgress, descendantIds?.length, dispatch, rootId, nodeId]);

  return {
    onDragStart,
    handleDragStop,
    onDropCapture,
  };
}
