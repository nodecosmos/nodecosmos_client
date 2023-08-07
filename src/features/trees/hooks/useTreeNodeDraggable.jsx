/* eslint-disable no-shadow */
import { useDispatch, useSelector } from 'react-redux';
import { clearDragAndDrop, setDragAndDrop, setTreeLoading } from '../treesSlice';
import { selectDragAndDrop } from '../trees.selectors';
import { reorderNodes } from '../../nodes/nodesSlice';
import { reorder } from '../../nodes/nodes.thunks';
import { setAlert } from '../../app/appSlice';

export default function useTreeNodeDraggable() {
  const dispatch = useDispatch();

  const { nodeId, persistentId, persistentRootId } = useSelector(selectDragAndDrop);

  const onDragStart = ({
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
  };

  const handleDragStop = () => {
    dispatch(clearDragAndDrop());
  };

  const onDropCapture = async ({
    newParentId,
    newSiblingIndex,
    persistentNewParentId,
  }) => {
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
      const message = e.message.includes(423) // TODO: fix this logic at redux-toolkit level. Maybe we need middleware.
        ? 'Resource locked! Reorder in progress.'
        : 'Something went wrong while reordering the node. Please try again.';

      dispatch(setAlert({
        isOpen: true,
        severity: 'error',
        message,
      }));
      dispatch(setTreeLoading(false));
    }
  };

  return {
    onDragStart,
    handleDragStop,
    onDropCapture,
  };
}
