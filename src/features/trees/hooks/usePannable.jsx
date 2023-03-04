// pan on mouse click and drag
export default function usePannable(containerRef) {
  const handleMouseDown = (event) => {
    const { clientX: initialClientX, clientY: initialClientY } = event;
    const { scrollLeft: initialScrollLeft, scrollTop: initialScrollTop } = containerRef.current;

    const handleMouseMove = (moveEvent) => {
      const { clientX, clientY } = moveEvent;

      const scrollLeft = initialScrollLeft + initialClientX - clientX;
      const scrollTop = initialScrollTop + initialClientY - clientY;

      containerRef.current.scrollLeft = scrollLeft;
      containerRef.current.scrollTop = scrollTop;
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
