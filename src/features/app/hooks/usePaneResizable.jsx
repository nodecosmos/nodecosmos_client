import { useState } from 'react';

export default function usePaneResizable({
  aRef, bRef, initialWidthA, initialWidthB,
}) {
  const [paneAWidth, setPaneAWidth] = useState(initialWidthA || '50%');
  const [paneBWidth, setPaneBWidth] = useState(initialWidthB || '50%');

  const handleResize = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.pageX;
    const startAWidth = aRef.current.offsetWidth;
    const startPaneWidth = bRef.current.offsetWidth;

    const handleMouseMove = (e2) => {
      e.stopPropagation();
      e.preventDefault();
      const dx = e2.pageX - startX;
      const newAWidth = startAWidth + dx;
      const newPaneWidth = startPaneWidth - dx;

      let newPaneAWidthPercent = (newAWidth / aRef.current.parentNode.offsetWidth) * 100;
      let newPaneBWidthPercent = (newPaneWidth / bRef.current.parentNode.offsetWidth) * 100;

      if (newPaneAWidthPercent < 20) {
        newPaneAWidthPercent = 20;
        newPaneBWidthPercent = 80;
      } else if (newPaneAWidthPercent > 80) {
        newPaneAWidthPercent = 80;
        newPaneBWidthPercent = 20;
      }

      setPaneAWidth(`${newPaneAWidthPercent}%`);
      setPaneBWidth(`${newPaneBWidthPercent}%`);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return {
    paneAWidth,
    paneBWidth,
    handleResize,
  };
}
