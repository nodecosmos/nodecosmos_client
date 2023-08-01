import { useDispatch, useSelector } from 'react-redux';
import { clearDragAndDrop, setDragAndDrop } from '../treesSlice';
import { selectDragAndDrop } from '../trees.selectors';
import { reorderNodes } from '../../nodes/nodesSlice';

export default function useTreeNodeDraggable() {
  const dispatch = useDispatch();

  const { nodeId } = useSelector(selectDragAndDrop);

  const handleDragStart = (e, draggedNodeId) => {
    const img = document.createElement('img');
    img.src = '/drag-image.svg';
    e.dataTransfer.setDragImage(img, 10, -8);

    dispatch(setDragAndDrop({
      isDragging: true,
      nodeId: draggedNodeId,
    }));
  };

  const handleDragStop = () => {
    dispatch(clearDragAndDrop());
  };

  const onDropCapture = ({ newParentId, newSiblingIndex }) => {
    dispatch(reorderNodes({
      nodeId,
      newParentId,
      newSiblingIndex,
    }));
    dispatch(clearDragAndDrop());
  };

  return {
    handleDragStart,
    handleDragStop,
    onDropCapture,
  };
}
