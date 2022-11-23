/* eslint-disable no-shadow */
import React from 'react';

// pan on mousedown
// animated inertia on mouseup
export default function usePannable(ref, defaultPan) {
  const [pan, setPan] = React.useState(defaultPan);
  const [isPanning, setIsPanning] = React.useState(false);

  // handle mouse down
  const handleMouseDown = React.useCallback(
    (event) => {
      if (event.button !== 1) return;

      event.preventDefault();
      const { x, y } = ref.current.getBoundingClientRect();
      const startX = event.clientX - x;
      const startY = event.clientY - y;

      const handleMouseMove = (event) => {
        event.preventDefault();

        const { x, y } = ref.current.getBoundingClientRect();
        const endX = event.clientX - x;
        const endY = event.clientY - y;

        setPan((pan) => ({
          x: pan.x + (endX - startX),
          y: pan.y + (endY - startY),
        }));
      };

      const handleMouseUp = () => {
        setIsPanning(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      setIsPanning(true);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [ref],
  );

  // handle mobile without pinch
  const handleTouchStart = React.useCallback((event) => {
    const { x, y } = ref.current.getBoundingClientRect();
    const startX = event.touches[0].clientX - x;
    const startY = event.touches[0].clientY - y;

    const handleTouchMove = (event) => {
      event.preventDefault();
      const { x, y } = ref.current.getBoundingClientRect();
      const endX = event.touches[0].clientX - x;
      const endY = event.touches[0].clientY - y;

      setPan((pan) => ({
        x: pan.x + (endX - startX),
        y: pan.y + (endY - startY),
      }));
    };

    const handleTouchEnd = () => {
      setIsPanning(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    setIsPanning(true);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }, [ref]);

  return {
    pan, isPanning, handleMouseDown, handleTouchStart,
  };
}
