/* eslint-disable no-shadow */
import React from 'react';

// pan on mousedown
// animated inertia on mouseup
export default function usePannable(ref) {
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = React.useState(false);

  // handle panning
  const handleMouseDown = (event) => {
    if (event.ctrlKey) {
      setIsPanning(true);
      const { clientX, clientY } = event;
      const { x, y } = pan;
      const startX = clientX - x;
      const startY = clientY - y;

      const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        setPan({
          x: clientX - startX,
          y: clientY - startY,
        });
      };

      const handleMouseUp = () => {
        setIsPanning(false);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  };

  // handle mobile
  // make it possible to alter speed
  const handleTouchStart = (event) => {
    if (event.touches.length !== 1) return;

    setIsPanning(true);
    const { clientX, clientY } = event.touches[0];
    const { x, y } = pan;
    const startX = clientX - x;
    const startY = clientY - y;

    const handleTouchMove = (event) => {
      if (event.touches.length !== 1) return;

      const { clientX, clientY } = event.touches[0];
      setPan({
        x: clientX - startX,
        y: clientY - startY,
      });
    };

    const handleTouchEnd = () => {
      setIsPanning(false);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  return {
    pan,
    isPanning,
    handleMouseDown,
    handleTouchStart,
    setPan,
    setIsPanning,
  };
}
