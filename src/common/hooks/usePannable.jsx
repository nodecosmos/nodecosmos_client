// pan on mouse click and drag
import { useSelector } from 'react-redux';
import { selectDragAndDrop } from '../../features/trees/trees.selectors';

export default function usePannable(containerRef) {
  const dragAndDrop = useSelector(selectDragAndDrop);

  const handleMouseDown = (event) => {
    if (dragAndDrop.isDragging) return;

    const { clientX: initialClientX, clientY: initialClientY } = event;
    const { scrollLeft: initialScrollLeft, scrollTop: initialScrollTop } = containerRef.current;

    const handleMouseMove = (moveEvent) => {
      const { clientX, clientY } = moveEvent;

      const scrollLeft = initialScrollLeft + initialClientX - clientX;
      const scrollTop = initialScrollTop + initialClientY - clientY;

      if (containerRef.current) {
        containerRef.current.scrollLeft = scrollLeft;
        containerRef.current.scrollTop = scrollTop;
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return {
    onMouseDown: handleMouseDown,
  };
}
